<?php
/**
 * AL-MANNAN ENTERPRISES - Candidate Application & CV Upload Handler
 * Production GoDaddy cPanel / Apache + PHP 7.4 - 8.x
 *
 * Endpoint: /api/apply.php
 * Recipient: info@almannanenterprises.com
 * Sender:    no-reply@almannanenterprises.com
 */

// Disable error display to prevent leaking server paths or sensitive information
error_reporting(0);
@ini_set('display_errors', '0');

// Set JSON and CORS headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST is accepted.'
    ]);
    exit;
}

// 1. RECIPIENT & SENDER CONFIGURATION
$RECIPIENT_EMAIL = 'info@almannanenterprises.com';
$SENDER_EMAIL    = 'no-reply@almannanenterprises.com';
$COMPANY_NAME    = 'AL-MANNAN ENTERPRISES';

// 2. PARSE FORM DATA (Multipart / Form-data or JSON fallback)
$data = $_POST;
if (empty($data)) {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? [];
}
if (!is_array($data)) {
    $data = [];
}

// 3. HONEYPOT ANTI-SPAM PROTECTION
if (!empty($data['website_hp'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Your application has been submitted successfully.'
    ]);
    exit;
}

// 4. SANITIZE HELPER
function sanitize_text($str) {
    if ($str === null) return '';
    $clean = strip_tags((string)$str);
    return htmlspecialchars(trim($clean), ENT_QUOTES, 'UTF-8');
}

$fullName   = sanitize_text($data['fullName'] ?? $data['name'] ?? '');
$emailRaw   = trim((string)($data['email'] ?? ''));
$email      = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
$phone      = sanitize_text($data['phone'] ?? '');
$country    = sanitize_text($data['country'] ?? 'Pakistan');
$profession = sanitize_text($data['profession'] ?? $data['trade'] ?? '');
$experience = sanitize_text($data['experience'] ?? 'Not specified');
$education  = sanitize_text($data['education'] ?? $data['qualification'] ?? 'Not specified');
$cnic       = sanitize_text($data['cnic'] ?? $data['passport'] ?? '');
$message    = sanitize_text($data['message'] ?? '');

// 5. VALIDATION
$errors = [];

if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors[] = 'Full Legal Name is required.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($phone) || mb_strlen($phone) < 5) {
    $errors[] = 'Contact phone number is required.';
}

if (empty($profession) || mb_strlen($profession) < 2) {
    $errors[] = 'Profession or trade category is required.';
}

// 6. CV FILE VALIDATION & SECURITY INSPECTION
$hasCv = false;
$cvFileContent = null;
$cvSafeFileName = 'None';
$cvMimeType = 'application/octet-stream';

if (isset($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'An error occurred during CV file upload. Please try again.';
    } else {
        $maxFileSize = 5 * 1024 * 1024; // 5 MB
        $fileSize    = $_FILES['cv']['size'];
        $fileTmpPath = $_FILES['cv']['tmp_name'];
        $originalName= $_FILES['cv']['name'];
        $fileExt     = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        // Enforce 5 MB maximum size limit
        if ($fileSize > $maxFileSize) {
            $errors[] = 'CV file size exceeds 5MB limit. Please upload a smaller document.';
        }

        // Allowed document extensions - PDF, DOC, and DOCX
        $allowedExtensions = ['pdf', 'doc', 'docx'];
        if (!in_array($fileExt, $allowedExtensions, true)) {
            $errors[] = 'Invalid file format. Only PDF, DOC, or DOCX documents are accepted.';
        }

        // Block all executable or script extensions
        $disallowedExtensions = ['php', 'phtml', 'phar', 'exe', 'sh', 'js', 'html', 'htm', 'bat', 'cmd', 'vbs', 'pl', 'py'];
        if (in_array($fileExt, $disallowedExtensions, true)) {
            $errors[] = 'Uploaded file type is not permitted for security reasons.';
        }

        // Deep content verification using file signatures & mime detection
        if (empty($errors) && file_exists($fileTmpPath)) {
            $detectedMime = '';
            if (function_exists('finfo_open')) {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $detectedMime = finfo_file($finfo, $fileTmpPath);
                finfo_close($finfo);
            } elseif (function_exists('mime_content_type')) {
                $detectedMime = mime_content_type($fileTmpPath);
            }

            // Inspect file header bytes
            $fp = @fopen($fileTmpPath, 'rb');
            $headerBytes = $fp ? fread($fp, 8) : '';
            if ($fp) {
                fclose($fp);
            }

            // Check for dangerous binary/script signatures
            if (strpos($headerBytes, 'MZ') === 0 || strpos($headerBytes, "\x7fELF") === 0 || strpos($headerBytes, '<?php') !== false) {
                $errors[] = 'Uploaded file failed security validation.';
            }

            // Validate format specific signatures
            if ($fileExt === 'pdf') {
                if (strpos($headerBytes, '%PDF') !== 0 && strpos((string)$detectedMime, 'pdf') === false) {
                    $errors[] = 'The uploaded file does not appear to be a valid PDF document.';
                }
                $cvMimeType = 'application/pdf';
            } elseif ($fileExt === 'docx') {
                // DOCX is a zipped XML package starting with 'PK' (0x50 0x4B 0x03 0x04)
                if (strpos($headerBytes, "PK\x03\x04") !== 0 && strpos((string)$detectedMime, 'zip') === false && strpos((string)$detectedMime, 'wordprocessingml') === false) {
                    $errors[] = 'The uploaded file does not appear to be a valid DOCX document.';
                }
                $cvMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            } elseif ($fileExt === 'doc') {
                $cvMimeType = 'application/msword';
            }

            if (empty($errors)) {
                $hasCv = true;
                // Generate a safe filename devoid of path traversal characters
                $cleanBase = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
                $cvSafeFileName = 'CV_' . substr($cleanBase, 0, 25) . '_' . date('Ymd_His') . '.' . $fileExt;
                $cvFileContent = file_get_contents($fileTmpPath);
            }
        }
    }
} else {
    $errors[] = 'Upload Your CV / Resume is required (PDF, DOC, or DOCX, max 5MB).';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
        'error'   => implode(' ', $errors)
    ]);
    exit;
}

// 7. PREVENT EMAIL HEADER INJECTION
$cleanName  = preg_replace('/[\r\n]+/', ' ', $fullName);
$cleanEmail = preg_replace('/[\r\n]+/', '', $email);
$rawSubject = "Candidate Application: {$profession} - {$cleanName}";
$cleanSubject = preg_replace('/[\r\n]+/', ' ', $rawSubject);

// 8. BUILD EMAIL TEXT
$emailText  = "========================================================\n";
$emailText .= " {$COMPANY_NAME} - CANDIDATE REGISTRATION\n";
$emailText .= "========================================================\n\n";

$emailText .= "Application Date: " . date('Y-m-d H:i:s T') . "\n\n";

$emailText .= "--------------------------------------------------------\n";
$emailText .= "CANDIDATE PROFILE DETAILS\n";
$emailText .= "--------------------------------------------------------\n";
$emailText .= "Full Name:       {$fullName}\n";
$emailText .= "Email:           {$email}\n";
$emailText .= "Phone / WhatsApp:{$phone}\n";
if (!empty($cnic)) {
    $emailText .= "CNIC / Passport: {$cnic}\n";
}
$emailText .= "Nationality/Res: {$country}\n";
$emailText .= "Trade/Profession:{$profession}\n";
$emailText .= "Experience:      {$experience}\n";
$emailText .= "Education:       {$education}\n";
$emailText .= "Attached Resume: " . ($hasCv ? $cvSafeFileName : 'None provided') . "\n\n";

$emailText .= "--------------------------------------------------------\n";
$emailText .= "CANDIDATE NOTES & TRADE HIGHLIGHTS\n";
$emailText .= "--------------------------------------------------------\n";
$emailText .= (!empty($message) ? $message : 'None provided') . "\n\n";

$emailText .= "========================================================\n";
$emailText .= "Origin: https://almannanenterprises.com/\n";
$emailText .= "IP:     " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

// 9. ASSEMBLE EMAIL AND ATTACH CV IF PRESENT
$boundary = "==Multipart_Boundary_x" . md5(uniqid((string)time(), true)) . "x";

$headers = [];
$headers[] = "From: {$COMPANY_NAME} <{$SENDER_EMAIL}>";
$headers[] = "Reply-To: {$cleanName} <{$cleanEmail}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";

if ($hasCv && $cvFileContent !== null) {
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    $messageBody  = "--{$boundary}\r\n";
    $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $messageBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $messageBody .= $emailText . "\r\n\r\n";

    $encodedFile = chunk_split(base64_encode($cvFileContent));
    $messageBody .= "--{$boundary}\r\n";
    $messageBody .= "Content-Type: {$cvMimeType}; name=\"{$cvSafeFileName}\"\r\n";
    $messageBody .= "Content-Disposition: attachment; filename=\"{$cvSafeFileName}\"\r\n";
    $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $messageBody .= $encodedFile . "\r\n\r\n";
    $messageBody .= "--{$boundary}--";
} else {
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    $messageBody = $emailText;
}

// 10. TRANSMIT EMAIL VIA PHP mail()
$mailSent = @mail($RECIPIENT_EMAIL, $cleanSubject, $messageBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your application has been submitted successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to submit your application. Please try again.'
    ]);
}
exit;
