<?php
    include('database.php');
    $id = $_POST['tareaId'];
    $query = "SELECT * FROM tareas WHERE id = '$id'";
    $result = mysqli_query($conn, $query);
    if(!$result){
        die('Error de consulta'. mysqli_error($conn));
    }
    else{
        if(mysqli_num_rows($result)>0){
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json = array(
                    'id' => $row['id'],
                    'nombre' => $row['nombre'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>