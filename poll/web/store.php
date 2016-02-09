<?php
    header('Access-Control-Allow-Origin: *');
      
    $data = $_POST['data'];
    $id = $_POST['id'];
    if (!empty($data) and !empty($id)) {
        $poll = array(
            "id" => $id,
            "data" => $data
        );
        if (!file_exists("./manifest.json")) {
            $total = array();
        }
        else
            $total = json_decode(file_get_contents("manifest.json"), true);
            
        array_push($total, $poll);
        file_put_contents("manifest.json", json_encode($total));
    }
    if(file_exists($id . ".csv")) {
        // DO NOTHING, QUESTION EXISTS
    } else {
        fwrite($indices, $data);
        $file = fopen($id . ".csv", "w+");
        fwrite($file, "\n");
        
        fclose($file);
        fclose($indices);
    }
?>