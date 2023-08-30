<?php

// Uso para debug
$dd = function ($args) {
  var_dump($args);
  die;
};

if (sizeof($_POST) < 0) {
  echo json_encode(['success' => false, 'message' => 'Dados não enviados.']);
  die;
}


$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$attachment = "";

if (sizeof($_FILES) > 0) {
  $uploadDir = 'uploads/';
  $uploadedFile = $_FILES['attachment'];

  if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
    $fileName = $uploadedFile['name'];
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($uploadedFile['tmp_name'], $filePath)) {
      $attachment = $filePath;
    } else {
      echo json_encode(['success' => false, 'message' => 'Falha ao enviar o arquivo.']);
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Erro ao fazer upload do arquivo.']);
  }
}

echo json_encode(['success' => true, 'message' => 'Arquivo enviado com sucesso.', 'data' => ['name' => $name, 'email' => $email, 'message' => $message, 'attachment' => $attachment]]);
