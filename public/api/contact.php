<?php
/**
 * AL-MANNAN ENTERPRISES - Contact & Manpower Inquiry Handler
 * Production GoDaddy cPanel / Apache + PHP 7.4 - 8.x
 *
 * Endpoint: /api/contact.php
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

// 2. PARSE REQUEST DATA (Supports both JSON and application/x-www-form-urlencoded or multipart/form-data)
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

if (!is_array($data)) {
    $data = [];
}

// 3. HONEYPOT ANTI-SPAM PROTECTION
// 'website_hp' is a hidden field; real users leave it blank
if (!empty($data['website_hp'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your inquiry has been submitted successfully.'
    ]);
    exit;
}

// 4. SANITIZE HELPER
function sanitize_text($str) {
    if ($str === null) return '';
    $clean = strip_tags((string)$str);
    return htmlspecialchars(trim($clean), ENT_QUOTES, 'UTF-8');
}

// Extract fields from contact form and manpower inquiry form
$fullName         = sanitize_text($data['fullName'] ?? $data['contactPerson'] ?? $data['name'] ?? '');
$emailRaw         = trim((string)($data['email'] ?? ''));
$email            = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
$phone            = sanitize_text($data['phone'] ?? '');
$company          = sanitize_text($data['company'] ?? $data['companyName'] ?? '');
$designation      = sanitize_text($data['designation'] ?? '');
$country          = sanitize_text($data['country'] ?? $data['destinationCountry'] ?? '');
$service          = sanitize_text($data['service'] ?? $data['serviceDivision'] ?? 'General Inquiry');
$subjectUser      = sanitize_text($data['subject'] ?? '');
$message          = sanitize_text($data['message'] ?? $data['jobScopeDetails'] ?? '');
$workforceCategory= sanitize_text($data['workforceCategory'] ?? '');
$workersCount     = sanitize_text($data['workersCount'] ?? $data['headcount'] ?? '');
$timeline         = sanitize_text($data['timeline'] ?? $data['deploymentTimeline'] ?? '');
$industrySector   = sanitize_text($data['industrySector'] ?? '');
$testingPreference= sanitize_text($data['testingPreference'] ?? '');
$referenceCode    = sanitize_text($data['referenceCode'] ?? '');

// Handle trade listings if array or string
$tradesList = '';
if (!empty($data['tradesList'])) {
    $tradesList = sanitize_text($data['tradesList']);
} elseif (isset($data['tradesNeeded']) && is_array($data['tradesNeeded'])) {
    $cleanTrades = array_map('sanitize_text', $data['tradesNeeded']);
    $tradesList = implode(', ', array_filter($cleanTrades));
    if (!empty($data['customTradesText'])) {
        $tradesList .= ' | Other: ' . sanitize_text($data['customTradesText']);
    }
}

// 5. VALIDATION
$errors = [];

if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors[] = 'Full Name is required.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($message) && empty($tradesList) && empty($workforceCategory) && empty($workersCount)) {
    $errors[] = 'Please provide details or workforce specifications for your inquiry.';
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

// 6. PREVENT EMAIL HEADER INJECTION
$cleanName  = preg_replace('/[\r\n]+/', ' ', $fullName);
$cleanEmail = preg_replace('/[\r\n]+/', '', $email);

// Determine email subject
if (!empty($referenceCode)) {
    $rawSubject = "New Manpower Inquiry [{$referenceCode}] - {$cleanName}";
} elseif (!empty($subjectUser)) {
    $rawSubject = "Inquiry: {$subjectUser} - {$cleanName}";
} elseif (!empty($workforceCategory) || !empty($tradesList) || !empty($workersCount)) {
    $rawSubject = "New Manpower Inquiry - {$COMPANY_NAME} ({$cleanName})";
} else {
    $rawSubject = "New Inquiry: {$service} - {$cleanName}";
}
$cleanSubject = preg_replace('/[\r\n]+/', ' ', $rawSubject);

// 7. BUILD EMAIL BODY
$body  = "========================================================\n";
$body .= " {$COMPANY_NAME} - WEBSITE INQUIRY\n";
$body .= "========================================================\n\n";

$body .= "Submission Date: " . date('Y-m-d H:i:s T') . "\n";
if (!empty($referenceCode)) {
    $body .= "Reference Code:  {$referenceCode}\n";
}
$body .= "Inquiry Type:    {$service}\n\n";

$body .= "--------------------------------------------------------\n";
$body .= "CONTACT DETAILS\n";
$body .= "--------------------------------------------------------\n";
$body .= "Name:            {$fullName}\n";
$body .= "Email:           {$email}\n";
$body .= "Phone:           " . (!empty($phone) ? $phone : 'Not provided') . "\n";
$body .= "Company / Org:   " . (!empty($company) ? $company : 'Individual / Not specified') . "\n";
if (!empty($designation)) {
    $body .= "Designation:     {$designation}\n";
}
$body .= "Country:         " . (!empty($country) ? $country : 'Not specified') . "\n\n";

if (!empty($workforceCategory) || !empty($tradesList) || !empty($workersCount) || !empty($timeline) || !empty($industrySector) || !empty($testingPreference)) {
    $body .= "--------------------------------------------------------\n";
    $body .= "WORKFORCE / MANPOWER SPECIFICATIONS\n";
    $body .= "--------------------------------------------------------\n";
    if (!empty($service)) {
        $body .= "Service:         {$service}\n";
    }
    if (!empty($workforceCategory)) {
        $body .= "Category:        {$workforceCategory}\n";
    }
    if (!empty($tradesList)) {
        $body .= "Target Trades:   {$tradesList}\n";
    }
    if (!empty($workersCount)) {
        $body .= "Workers Needed:  {$workersCount}\n";
    }
    if (!empty($timeline)) {
        $body .= "Timeline:        {$timeline}\n";
    }
    if (!empty($industrySector)) {
        $body .= "Industry Sector: {$industrySector}\n";
    }
    if (!empty($testingPreference)) {
        $body .= "Trade Testing:   {$testingPreference}\n";
    }
    $body .= "\n";
}

$body .= "--------------------------------------------------------\n";
$body .= "MESSAGE / SCOPE OF WORK\n";
$body .= "--------------------------------------------------------\n";
$body .= (!empty($message) ? $message : 'None provided') . "\n\n";

$body .= "========================================================\n";
$body .= "Origin: https://almannanenterprises.com/\n";
$body .= "IP:     " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

// 8. COMPOSE EMAIL HEADERS
$headers = [];
$headers[] = "From: {$COMPANY_NAME} <{$SENDER_EMAIL}>";
$headers[] = "Reply-To: {$cleanName} <{$cleanEmail}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// 9. SEND EMAIL VIA PHP mail()
$mailSent = @mail($RECIPIENT_EMAIL, $cleanSubject, $body, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your inquiry has been submitted successfully.'
    ]);
} else {
    // If mail function fails on server
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to submit your inquiry. Please try again.'
    ]);
}
exit;
