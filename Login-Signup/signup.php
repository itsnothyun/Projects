<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Signup successful']);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Signup failed']);
}

$stmt->close();
$conn->close();
?>
