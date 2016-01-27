<?php
    header('Access-Control-Allow-Origin: *');
      
    $data = $_POST['data'];
    $id = $_POST['id'];
    
    $indices = fopen("manifest.csv", "a+");
    
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