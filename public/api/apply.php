<?php
/**
 * AL-MANNAN ENTERPRISES - Candidate Registration & Overseas Application Handler
 * Compatible with GoDaddy Standard Linux / cPanel Shared Hosting (PHP 7.4 - 8.x)
 *
 * PLACEHOLDER CONFIGURATION:
 * Replace the values below with your verified cPanel email addresses.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Only POST is accepted.']);
    exit;
}

// 1. BUSINESS RECIPIENT CONFIGURATION
$RECIPIENT_EMAIL = "recruitment@almannanenterprises.com"; // <-- [PLACEHOLDER: REPLACE WITH YOUR RECRUITMENT EMAIL]
$SENDER_EMAIL = "no-reply@almannanenterprises.com";       // <-- [PLACEHOLDER: REPLACE WITH YOUR cPanel WEBMAIL]
$COMPANY_NAME = "AL-MANNAN ENTERPRISES";

// 2. PARSE DATA
$data = $_POST;
if (empty($data)) {
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true) ?? [];
}

// 3. HONEYPOT CHECK
if (!empty($data['website_hp'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your candidate profile has been received.'
    ]);
    exit;
}

function sanitize($str) {
    return htmlspecialchars(trim((string)$str), ENT_QUOTES, 'UTF-8');
}

$fullName = sanitize($data['fullName'] ?? '');
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = sanitize($data['phone'] ?? '');
$country = sanitize($data['country'] ?? 'Pakistan');
$profession = sanitize($data['profession'] ?? '');
$experience = sanitize($data['experience'] ?? '');
$education = sanitize($data['education'] ?? '');
$message = sanitize($data['message'] ?? '');

// 4. VALIDATION
$errors = [];
if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors[] = 'Full Name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (empty($phone) || mb_strlen($phone) < 5) {
    $errors[] = 'Contact phone number is required.';
}
if (empty($profession)) {
    $errors[] = 'Profession or trade category is required.';
}

// CV File Validation (if provided)
$hasCv = false;
$cvFileName = 'None provided';
$cvTempPath = '';
$cvMime = '';

if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
    $allowedExtensions = ['pdf', 'doc', 'docx', 'rtf'];
    $allowedMimes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/rtf',
        'text/rtf'
    ];
    $maxFileSize = 5 * 1024 * 1024; // 5 MB max

    $originalName = $_FILES['cv']['name'];
    $fileSize = $_FILES['cv']['size'];
    $fileTmp = $_FILES['cv']['tmp_name'];
    $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    if ($fileSize > $maxFileSize) {
        $errors[] = 'CV file size exceeds 5MB limit.';
    } elseif (!in_array($fileExt, $allowedExtensions)) {
        $errors[] = 'Only PDF, DOC, or DOCX formats are accepted for CV uploads.';
    } else {
        $hasCv = true;
        $cvFileName = sanitize($originalName);
        $cvTempPath = $fileTmp;
        $cvMime = mime_content_type($fileTmp) ?: 'application/octet-stream';
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// 5. EMAIL NOTIFICATION
$subject = "Candidate Registration: {$profession} - {$fullName}";
$boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

$emailText = "========================================================\n";
$emailText .= " AL-MANNAN ENTERPRISES - CANDIDATE APPLICATION\n";
$emailText .= "========================================================\n\n";
$emailText .= "Full Name:       {$fullName}\n";
$emailText .= "Email:           {$email}\n";
$emailText .= "Phone:           {$phone}\n";
$emailText .= "Current Country: {$country}\n";
$emailText .= "Profession/Trade:{$profession}\n";
$emailText .= "Experience:      {$experience}\n";
$emailText .= "Education:       {$education}\n";
$emailText .= "CV File Name:    {$cvFileName}\n\n";
$emailText .= "Candidate Note:\n";
$emailText .= "--------------------------------------------------------\n";
$emailText .= (!empty($message) ? $message : 'None') . "\n\n";
$emailText .= "Submitted on: " . date('Y-m-d H:i:s T') . "\n";
$emailText .= "IP Address:   " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

$headers = [];
$headers[] = "From: {$COMPANY_NAME} <{$SENDER_EMAIL}>";
$headers[] = "Reply-To: {$fullName} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";

if ($hasCv && file_exists($cvTempPath)) {
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    $messageBody = "--{$boundary}\r\n";
    $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $messageBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $messageBody .= $emailText . "\r\n\r\n";

    $fileContent = chunk_split(base64_encode(file_get_contents($cvTempPath)));
    $messageBody .= "--{$boundary}\r\n";
    $messageBody .= "Content-Type: {$cvMime}; name=\"{$cvFileName}\"\r\n";
    $messageBody .= "Content-Disposition: attachment; filename=\"{$cvFileName}\"\r\n";
    $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $messageBody .= $fileContent . "\r\n\r\n";
    $messageBody .= "--{$boundary}--";
} else {
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    $messageBody = $emailText;
}

@mail($RECIPIENT_EMAIL, $subject, $messageBody, implode("\r\n", $headers));

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Thank you. Your candidate registration has been submitted successfully for overseas employment opportunities.',
    'cvAttached' => $hasCv
]);
exit;
