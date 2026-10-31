<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';


$mail = new PHPMailer(true);


$name = isset($_POST['name']) && trim($_POST['name']) !== '' ? htmlspecialchars(trim($_POST['name'])) : 'Website Visitor';
$phone = isset($_POST['phone']) && trim($_POST['phone']) !== '' ? htmlspecialchars(trim($_POST['phone'])) : 'Not Provided';
$email = isset($_POST['email']) && trim($_POST['email']) !== '' ? htmlspecialchars(trim($_POST['email'])) : 'Not Provided';
$city = isset($_POST['city']) && trim($_POST['city']) !== '' ? htmlspecialchars(trim($_POST['city'])) : (isset($_POST['nationality']) ? htmlspecialchars(trim($_POST['nationality'])) : '');
$message = isset($_POST['message']) && trim($_POST['message']) !== '' ? htmlspecialchars(trim($_POST['message'])) : '';

$body = "";
$body .= '<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">';
$body .= '<h3 style="color: #0b1f3a; border-bottom: 2px solid #c89d53; padding-bottom: 8px;">New Lead  Dubai Visa Assistance</h3>';
$body .= '<table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">';
$body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold; width: 35%;">Applicant / Lead Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . $name . '</td></tr>';
$body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Phone / WhatsApp:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . $phone . '</td></tr>';
$body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Email Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . $email . '</td></tr>';

if (!empty($city)) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Nationality / City:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . $city . '</td></tr>';
}
if (!empty($_POST['subject'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Subject / Inquiry:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['subject'])) . '</td></tr>';
}
if (!empty($_POST['visa_type'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Visa Category:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['visa_type'])) . '</td></tr>';
}
if (!empty($_POST['travel_date'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Expected Arrival Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['travel_date'])) . '</td></tr>';
}
if (!empty($_POST['applicants'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">No. of Travelers:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['applicants'])) . '</td></tr>';
}
if (!empty($_POST['purpose'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Purpose of Travel:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['purpose'])) . '</td></tr>';
}
if (!empty($_POST['urgency'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Processing Tier:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['urgency'])) . '</td></tr>';
}
if (!empty($_POST['reference_number'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Reference Number:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['reference_number'])) . '</td></tr>';
}
if (!empty($_POST['passport_number'])) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold;">Passport Number:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . htmlspecialchars(trim($_POST['passport_number'])) . '</td></tr>';
}
if (!empty($message)) {
    $body .= '<tr><td style="padding: 8px; background: #f8f9fa; font-weight: bold; vertical-align: top;">Message / Notes:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' . nl2br($message) . '</td></tr>';
}
$body .= '</table></div>';


try {
    // SMTP Settings
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@cognivicdigital.com';
    $mail->Password = 'Info@987--';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    // Email Settings
    $mail->setFrom('info@cognivicdigital.com', 'Dubai Visa Assistance');
    $mail->addAddress('manishkushwahaf7@gmail.com', $name); // Add a recipient
    $mail->Subject = 'New Dubai Visa Inquiry — ' . $name;
    $mail->MsgHTML($body);
    $mail->IsHTML(true);

    $mail->send();
    header("Location: thank-you");
    exit();
} catch (Exception $e) {
    echo "<script>
        alert('Mail Error: {$mail->ErrorInfo}');
        window.location.href = './';
    </script>";
}



?>