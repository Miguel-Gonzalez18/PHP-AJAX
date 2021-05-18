<?php
    include('database.php');

    if(isset($_POST['tareaId'])){
        $id = $_POST['tareaId'];
        $query = "DELETE FROM tareas WHERE id = '$id'";
        $result = mysqli_query($conn, $query);
        if(!$result){
            die('Error de consulta'. mysqli_error($conn));
        }
        else{
            echo 'Tarea borrada correctamente';
        }
    }
?>