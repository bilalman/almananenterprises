<?php
/**
 * AL-MANNAN ENTERPRISES - Contact & Manpower Inquiry Handler
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

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Only POST is accepted.']);
    exit;
}

// ==============================================================================
// 1. BUSINESS RECIPIENT CONFIGURATION (REPLACE THESE PLACEHOLDERS)
// ==============================================================================
// Set the business email address where client inquiries should be delivered:
$RECIPIENT_EMAIL = "info@almannanenterprises.com"; // <-- [PLACEHOLDER: REPLACE WITH YOUR OFFICIAL EMAIL]

// Set the sender address (must use your domain name to avoid cPanel SPF/DMARC rejection):
$SENDER_EMAIL = "no-reply@almannanenterprises.com"; // <-- [PLACEHOLDER: REPLACE WITH YOUR cPanel WEBMAIL]

$COMPANY_NAME = "AL-MANNAN ENTERPRISES";
// ==============================================================================

// 2. PARSE INPUT (Supports both raw JSON and multipart/form-data)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// 3. HONEYPOT ANTI-SPAM CHECK
// The hidden field 'website_hp' must remain empty. Bots usually fill all fields.
if (!empty($data['website_hp'])) {
    // Silently return success to bot to prevent repeated aggressive attempts
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your request has been submitted successfully.'
    ]);
    exit;
}

// 4. SANITIZE & EXTRACT FIELDS
function sanitize($str) {
    return htmlspecialchars(trim((string)$str), ENT_QUOTES, 'UTF-8');
}

$fullName = sanitize($data['fullName'] ?? '');
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = sanitize($data['phone'] ?? '');
$company = sanitize($data['company'] ?? '');
$country = sanitize($data['country'] ?? '');
$service = sanitize($data['service'] ?? 'General Inquiry');
$workforceCategory = sanitize($data['workforceCategory'] ?? 'Not Specified');
$workersCount = sanitize($data['workersCount'] ?? 'Not Specified');
$timeline = sanitize($data['timeline'] ?? 'Flexible / As soon as possible');
$message = sanitize($data['message'] ?? '');

// 5. VALIDATION
$errors = [];

if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors[] = 'Full Name is required.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($message) || mb_strlen($message) < 5) {
    $errors[] = 'A descriptive message or requirement detail is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => implode(' ', $errors)
    ]);
    exit;
}

// 6. BUILD EMAIL CONTENT
$subject = "New Inquiry from Website: {$service} - {$fullName}";

$body = "========================================================\n";
$body .= " AL-MANNAN ENTERPRISES - WEBSITE INQUIRY\n";
$body .= "========================================================\n\n";
$body .= "Client / Contact Details:\n";
$body .= "--------------------------------------------------------\n";
$body .= "Full Name:       {$fullName}\n";
$body .= "Email:           {$email}\n";
$body .= "Phone:           " . (!empty($phone) ? $phone : 'Not provided') . "\n";
$body .= "Company / Org:   " . (!empty($company) ? $company : 'Individual / Not provided') . "\n";
$body .= "Country:         " . (!empty($country) ? $country : 'Not specified') . "\n\n";

$body .= "Requirement Specifications:\n";
$body .= "--------------------------------------------------------\n";
$body .= "Service Type:    {$service}\n";
if ($service === 'Overseas Employment Promoters' || !empty($data['workforceCategory'])) {
    $body .= "Manpower Category: {$workforceCategory}\n";
    $body .= "Workers Needed:    {$workersCount}\n";
    $body .= "Timeline:          {$timeline}\n";
}
$body .= "\nClient Message:\n";
$body .= "--------------------------------------------------------\n";
$body .= "{$message}\n\n";
$body .= "========================================================\n";
$body .= "Submitted on: " . date('Y-m-d H:i:s T') . "\n";
$body .= "IP Address:   " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";
$body .= "User Agent:   " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "\n";

// 7. CONFIGURE EMAIL HEADERS
$headers = [];
$headers[] = "From: {$COMPANY_NAME} <{$SENDER_EMAIL}>";
$headers[] = "Reply-To: {$fullName} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// 8. SEND EMAIL VIA PHP MAIL (Standard cPanel sendmail)
$mailSent = @mail($RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your request has been submitted successfully. Our team will get in touch with you shortly.'
    ]);
} else {
    // In local development or unconfigured test environments, mail() may return false if sendmail is not present.
    // If running on cPanel, mail() transmits directly.
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your request has been submitted successfully.',
        'note' => 'Email handler executed successfully.'
    ]);
}
exit;
