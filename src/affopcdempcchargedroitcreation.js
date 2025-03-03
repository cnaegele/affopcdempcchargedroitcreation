import { ref } from 'vue'
import axios from 'axios'
let g_devurl = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}

export async function getDataUserInfo(groupeSecurite, lesData) {
    const urlui = `${g_devurl}/goeland/gestion_spec/g_login_f5.php`
    const params = new URLSearchParams([['groupesecurite', groupeSecurite]])
    const response = await axios.get(urlui, { params })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })   
    const userInfo = response.data
    lesData.idEmployeUser = ref(userInfo.id_employe)
    lesData.nomEmployeUser = ref(userInfo.nom_employe)
    lesData.prenomEmployeUser = ref(userInfo.prenom_employe)
    lesData.loginEmployeUser = ref(userInfo.login_employe)
    lesData.groupeSecurite = ref(userInfo.groupesecurite)
    lesData.bInGroupe = ref(userInfo.bingroupe)
}

export async function getDataUnitesOrgListe(lesData) {
    const urluo = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/unitesorg_liste.php`
    const response = await axios.get(urluo)
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })   
    const unitesorg = response.data
    lesData.unitesorg = ref(unitesorg)
    //console.log(lesData.nomenclatures)
}

export async function getDataEmployesCreationListe(lesData) {
    const idUniteOrg = lesData.idUniteOrg
    const urlec = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/charge_employes_creation_liste.php`
    const params = new URLSearchParams([['iduniteorg', idUniteOrg]])
    const response = await axios.get(urlec, {params})
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    const employesCreation = response.data
    employesCreation.forEach(emp => {
        emp.boolActifChargeCre = emp.bactif === 1    
    })
    lesData.employesCreation = ref(employesCreation)
    //console.log(lesData.employesCreation)
}

export async function getDataEmployesListe(lesData) {
    const critereEmployes = lesData.critereEmployes
    const critereEmployesInactifs = lesData.critereEmployesInactifs
    if (critereEmployes.length >= 3) {
        let bretInactif = 'false'
        if (critereEmployesInactifs) {
            bretInactif = 'true'    
        }
        const urlem = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/employes_liste.php`;
        const params = new URLSearchParams([['scritere', critereEmployes], ['bretinactif', bretInactif]]);
        const response = await axios.get(urlem, {params})
            .catch(function (error) {
                traiteAxiosError(error, lesData)
            })      
        const employesListe = response.data
        lesData.employesListe = ref(employesListe)
        //console.log(lesData.employesListe)
    }
}

export async function modifieChargeEmployeCreation(employeCreation, lesData) {
    const idUniteOrg = lesData.idUniteOrg
    const idEmploye = employeCreation.idemploye
    const boolActifChargeCre = employeCreation.boolActifChargeCre
    const idDocCT = employeCreation.iddocct

    console.log(`modifie idUniteOrg:${idUniteOrg} idEmploye:${idEmploye} boolActifChargeCre:${boolActifChargeCre} idDocCT:${idDocCT}`)
    const odata = {
        action: 'modifie',
        iduniteorg: idUniteOrg,
        idemploye: idEmploye,
        boolactifchargecre: boolActifChargeCre,
        iddocct: idDocCT
    }
    const jdata = JSON.stringify(odata)
    const urlmc = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/charge_employes_creation_sauve.php`
    const response = await axios.post(urlmc, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesData.messageErreur =  response.data.message   
    }
    getDataEmployesCreationListe(lesData)
}

export async function sauveChargeEmployeCreation(idEmploye, lesData) {
    const idUniteOrg = lesData.idUniteOrg
    console.log(`sauve idUniteOrg:${idUniteOrg} idEmploye:${idEmploye}`)
    const odata = {
        action: 'sauve',
        iduniteorg: idUniteOrg,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsc = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/charge_employes_creation_sauve.php`
    const response = await axios.post(urlsc, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesData.messageErreur =  response.data.message   
    }
    getDataEmployesCreationListe(lesData)
}

export async function supprimeChargeEmployeCreation(idEmploye, lesData) {
    const idUniteOrg = lesData.idUniteOrg
    console.log(`supprime idUniteOrg:${idUniteOrg} idEmploye:${idEmploye}`)
    const odata = {
        action: 'supprime',
        iduniteorg: idUniteOrg,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsc = `${g_devurl}/goeland/gestion_spec/affopcdempccharge_droitcreation/axios/charge_employes_creation_sauve.php`
    const response = await axios.post(urlsc, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
        console.log(response.data)
        if (response.data.message.indexOf('ERREUR') == 0) {
        lesData.messageErreur =  response.data.message   
    }
    getDataEmployesCreationListe(lesData)
}

function traiteAxiosError(error, lesData) {
    if (error.response) {
        lesData.messageErreur = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        lesData.messageErreur = error.request.responseText
    } else {
        lesData.messageErreur = error.message
    }
}
