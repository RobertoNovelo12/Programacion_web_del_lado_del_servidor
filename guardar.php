<?php

$host = "127.0.0.1";
$user = "root";
$pass = "12345";
$db   = "contactos_db";
$port = 3306;

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre   = $_POST["name"];
    $apellido = $_POST["apellido"];
    $email    = $_POST["email"];
    $tipo     = $_POST["q_type"];
    $mensaje  = $_POST["mensaje"];
    $autorizo = isset($_POST["autorizo"]) ? 1 : 0;

    $sql = "INSERT INTO mensajes
            (nombre, apellido, email, tipo_consulta, mensaje, autorizo)
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error en prepare: " . $conn->error);
    }

    $stmt->bind_param(
        "sssssi",
        $nombre,
        $apellido,
        $email,
        $tipo,
        $mensaje,
        $autorizo
    );

    if ($stmt->execute()) {
        echo "Datos guardados correctamente ✅";
    } else {
        echo "Error al guardar: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();