<?php
/**
 * RemoteAbility CIC Contact Form Handler
 * Simple PHP form processor with email notification and basic spam protection
 */

// Configuration
$to_email = "andrew@remoteability.org"; // Change this to your actual email
$from_email = "andrew@remoteability.org"; // Change to your domain
$subject_prefix = "RemoteAbility Contact Form: ";

// Spam protection - simple honeypot field (add hidden field in HTML)
if (!empty($_POST['website'])) {
    die('Spam detected');
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and validate inputs
    $name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $type = filter_var(trim($_POST['type'] ?? ''), FILTER_SANITIZE_STRING);
    $organisation = filter_var(trim($_POST['organisation'] ?? ''), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_STRING);
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($type)) {
        $errors[] = "Please select enquiry type";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If no errors, send email
    if (empty($errors)) {
        
        // Determine subject based on type
        $type_labels = [
            'participant' => 'Prospective Participant',
            'employer' => 'Employer/Partner',
            'funder' => 'Funder/Commissioner',
            'other' => 'General Enquiry'
        ];
        
        $subject = $subject_prefix . ($type_labels[$type] ?? 'New Enquiry');
        
        // Build email body
        $email_body = "New contact form submission from RemoteAbility CIC website\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Enquiry Type: " . ($type_labels[$type] ?? $type) . "\n";
        
        if (!empty($organisation)) {
            $email_body .= "Organisation: $organisation\n";
        }
        
        $email_body .= "\nMessage:\n$message\n";
        $email_body .= "\n---\n";
        $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
        $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
        
        // Headers
        $headers = "From: $from_email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send email
        if (mail($to_email, $subject, $email_body, $headers)) {
            // Success - redirect to thank you page or show message
            header("Location: thank-you.html");
            exit;
        } else {
            $errors[] = "Failed to send message. Please try again later.";
        }
        
    }
    
    // If there are errors, display them
    if (!empty($errors)) {
        echo "<h2>Error</h2>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>" . htmlspecialchars($error) . "</li>";
        }
        echo "</ul>";
        echo "<p><a href='javascript:history.back()'>Go back</a></p>";
    }
    
} else {
    // Not a POST request
    header("Location: index.html");
    exit;
}
?>
