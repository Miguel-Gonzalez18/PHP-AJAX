<?php
    include('database.php');
    $name = $_POST['name'];
    $description = $_POST['description'];

    if(!empty($name) && !empty($description)){
        $name = $_POST['name'];
        $descrption = $_POST['description'];
        $query = "INSERT INTO tareas(nombre, descripcion) VALUES('$name', '$descrption')";
        $result = mysqli_query($conn, $query);
        if(!$result){
            die('Error de consulta'. mysqli_error($conn));
        }
        else{
            echo 'Tarea agregada correctamente';
        }

    }
?>