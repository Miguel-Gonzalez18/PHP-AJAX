<?php
    include('database.php');


    $query = "SELECT * FROM tareas";
    $result = mysqli_query($conn, $query);
    if(!$result) {
        die('Query Failed'. mysqli_error($conn));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
        'name' => $row['nombre'],
        'description' => $row['descripcion'],
        'id' => $row['id'],
        'date' => $row['fecha']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>