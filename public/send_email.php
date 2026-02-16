<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = nl2br(htmlspecialchars($_POST["message"])); // Convert newlines to <br> for better formatting

    // Admin Email where form data will be sent
    $admin_email = "skiathos.smartride@gmail.com"; // CHANGE THIS!

    // Email Subject
    $subject = "📩 New Contact Form Submission from $name";

    // Email Content (Formatted in HTML)
    $email_body = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .container { padding: 20px; border: 1px solid #ddd; background-color: #fff; width: 80%; margin: auto; }
                h2 { color: #333; text-align: center; }
                p { font-size: 16px; line-height: 1.5; }
                .highlight { font-weight: bold; color: #2b7b2f; }
                .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>📬 New Contact Form Submission</h2>
                <p><strong>🧑 Name:</strong> <span class='highlight'>$name</span></p>
                <p><strong>📧 Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>📞 Phone:</strong> <a href='tel:$phone'>$phone</a></p>
                <hr>
                <p><strong>💬 Message:</strong></p>
                <p>$message</p>
                <hr>
                <p class='footer'>This message was sent via the website contact form.</p>
            </div>
        </body>
        </html>
    ";

    // Email Headers
    $headers = "From: Website Contact Form <skiathos.smartride@gmail.com>\r\n"; // Change this to a real domain email
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send Email
    if (mail($admin_email, $subject, $email_body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email. Try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
