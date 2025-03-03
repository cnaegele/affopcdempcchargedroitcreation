<?php
require_once 'gdt/cldbgoeland.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['iduniteorg'])) {
    $idUniteOrg = $_GET['iduniteorg'];
    $dbgo = new DBGoeland();
    $dbgo->queryRetJson2("cn_affopcdempcchargeemployeuo_employe_liste $idUniteOrg");
    echo $dbgo->resString;
    unset($dbgo);
} else {
    echo '[]';
}
