<?php
// login.php
header('Content-Type: application/json');
require 'db.php'; // Tu archivo para conectar con la base de datos

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

$result = // Tu consulta para revisar si existe el email;
if($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
