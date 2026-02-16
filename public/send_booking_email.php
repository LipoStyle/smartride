<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $mobile = htmlspecialchars($_POST["mobile"]);
    $startDateTime = htmlspecialchars($_POST["startDateTime"]);
    $endDateTime = htmlspecialchars($_POST["endDateTime"]);
    $hasLicense = isset($_POST["hasLicense"]) ? "✅ Yes" : "❌ No";
    $hasCarLicense = isset($_POST["hasCarLicense"]) ? "✅ Yes" : "❌ No";
    $selectedScooter = htmlspecialchars($_POST["selectedScooter"]);

    $admin_email = "skiathos.smartride@gmail.com"; // CHANGE THIS TO YOUR EMAIL

    $subject = "🛵 New Scooter Reservation from $name";

    $message = "
        <html>
        <head>
            <title>New Scooter Reservation</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9; }
                h2 { color: #333; }
                p { font-size: 16px; line-height: 1.5; }
                .highlight { font-weight: bold; color: #2b7b2f; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>📌 New Scooter Reservation Details</h2>
                <p><strong>🧑 Name:</strong> <span class='highlight'>$name</span></p>
                <p><strong>📧 Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>📞 Mobile:</strong> <span class='highlight'>$mobile</span></p>
                <hr>
                <p><strong>📅 Rent From:</strong> <span class='highlight'>$startDateTime</span></p>
                <p><strong>📅 Rent Until:</strong> <span class='highlight'>$endDateTime</span></p>
                <hr>
                <p><strong>🏍️ Motorcycle License:</strong> $hasLicense</p>
                <p><strong>🚗 Car Driver's License:</strong> $hasCarLicense</p>
                <hr>
                <p><strong>🛵 Selected Scooter:</strong> <span class='highlight'>$selectedScooter</span></p>
            </div>
        </body>
        </html>
    ";

    $headers = "From: Smart Ride <no-reply@yourdomain.com>\r\n"; // Change to a real domain email
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    if (mail($admin_email, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Reservation sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email."]);
    }
}
?>
