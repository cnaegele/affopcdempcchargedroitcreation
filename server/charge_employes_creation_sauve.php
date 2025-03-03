<?php
require 'gdt/gautentificationf5.php';
require_once '/data/dataweb/GoelandWeb/webservice/employe/clCNWSEmployeSecurite.php';
require_once 'gdt/cldbgoeland.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:  *");
header("Access-Control-Allow-Methods:  POST");
$idCaller = 0;
if (array_key_exists('empid', $_SESSION)) {
    $idCaller = $_SESSION['empid'];
}
if ($idCaller > 0) {
    $pseudoWSEmployeSecurite = new CNWSEmployeSecurite();
    if ($pseudoWSEmployeSecurite->isInGroupe($idCaller, 'GoelandManager')) {
        $jsonData = file_get_contents('php://input');
        $oData = json_decode($jsonData);
        $action = $oData->action;
        $idUniteOrg = $oData->iduniteorg;
        $idemploye = $oData->idemploye;
        $bActifChargeCre = 'NULL';
        $idDocCT = 'NULL';
        if ($action == 'modifie') {
            $boolActifChargeCre = $oData->boolactifchargecre;
            if ($boolActifChargeCre) {
                $bActifChargeCre = '1';
            } else {
                $bActifChargeCre = '0';
            }
            if (trim($oData->iddocct) != '') {
                $idDocCT = $oData->iddocct;
                $filter_options = array(
                    'options' => array( 'min_range' => 1,
                                        'max_range' => 99999999)
                );
               if( filter_var( $idDocCT, FILTER_VALIDATE_INT, $filter_options ) == FALSE) {
                    $idDocCT = 'NULL';
                }
            }
        }
        $dbgo = new DBGoeland();
        $sSql = "cn_affopcdempcchargeemployeuo_sauve '$action', $idUniteOrg, $idemploye, $bActifChargeCre, $idDocCT";
        //echo '{"message":"ERREUR ' . $sSql . '"}';
        $dbgo->queryRetNothing($sSql, 'W');
        unset($dbgo);
        echo '{"message":"ok"}';
    } else {
        echo '{"message":"ERREUR GoelandManager requis"}';
    }
} else {
    echo '{"message":"ERREUR athentification F5"}';
}
