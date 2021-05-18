<?php
    include('database.php');

    $nombre = $_POST['name'];
    $descripcion = $_POST['description'];
    $id = $_POST['id'];

    $query = "UPDATE tareas SET nombre = '$nombre', descripcion = '$descripcion' WHERE id = '$id'";
    $result = mysqli_query($conn, $query);
    if(!$result){
        die('Error de consulta'.mysqli_error($conn));
    }
    else{
        echo 'Actualizado correctamente';
    }
?>