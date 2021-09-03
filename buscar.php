<?php
    include('database.php');

    $search = $_POST['search'];
    if(!empty($search)){
        $query =  "SELECT * FROM tareas WHERE nombre LIKE '$search%'";
        $result = mysqli_query($conn, $query);

        if(!$result){
            die('Error de consulta: '.mysqli_error($conn));
        }
        else{
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    'id' => $row['id'],
                    'titulo' => $row['nombre'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>
