<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if (!empty($name) && (!empty($tel) || !empty($email))) {
        $data = "Name: $name" . PHP_EOL;

        if (!empty($tel)) {
            $data .= "Phone: $tel" . PHP_EOL;
        }

        if (!empty($email)) {
            $data .= "Email: $email" . PHP_EOL;
        }

        $data .= PHP_EOL;

        header('Content-Type: application/json');

        if (file_put_contents('leads.txt', $data, FILE_APPEND)  === false) {
            echo json_encode(['error' => true, 'text' => 'Ошибка записи данных.']);
        } else {
            echo json_encode(['error' => false, 'text' => 'Данные успешно записаны. С вами свяжутся.']);
        }
    } else {
        echo json_encode(['error' => true, 'text' => 'Пожалуйста, введите корректные данные.']);
    }} else {
    echo json_encode(['error' => true, 'text' => 'Пожалуйста, используйте метод POST.']);
}
