<?php
    $csvData = $_POST['data'] . "\n";
    $csvId = $_POST['id'];
    echo "id: $csvId\n";
    $csvFile = $csvId . '.csv';
    if (!$fileHandle = fopen($csvFile, "a+")) {
        echo "Can't open file ($csvFile)";
        exit;
    }
    if (fwrite($fileHandle, $csvData) === FALSE) {
        echo "Can't write to file ($csvFile)";
    }
    fclose($fileHandle);
    echo "Data was written to $csvFile: $csvData";
?>
