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

export async function getDataEmployesUtilisationListe(lesData) {
    const idNomenclature = lesData.idNomenclature
    const urlec = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/nomenclature_employes_utilisation_liste.php`
    const params = new URLSearchParams([['idnomenclature', idNomenclature]])
    const response = await axios.get(urlec, {params})
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })      
    const employesUtilisation = response.data
    lesData.employesUtilisation = ref(employesUtilisation)
    //console.log(lesData.employesUtilisation)
}

export async function getDataEmployesListe(lesData) {
    const critereEmployes = lesData.critereEmployes
    const critereEmployesInactifs = lesData.critereEmployesInactifs
    if (critereEmployes.length >= 3) {
        let bretInactif = 'false'
        if (critereEmployesInactifs) {
            bretInactif = 'true'    
        }
        const urlem = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/employes_liste.php`;
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

export async function sauveTypeAffaireEmployeCreation(idEmploye, lesData) {
    const idNomenclature = lesData.idNomenclature
    console.log(`sauve idNomenclature:${idNomenclature} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'sauve',
        idnomenclature: idNomenclature,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsn = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/nomenclature_employes_utilisation_sauve.php`
    const response = await axios.post(urlsn, jdata, {
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
    getDataEmployesUtilisationListe(lesData)
}

export async function supprimeNomenclatureEmployeUtilisation(idEmploye, lesData) {
    const idNomenclature = lesData.idNomenclature
    console.log(`supprime idNomenclature:${idNomenclature} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'supprime',
        idnomenclature: idNomenclature,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    console.log(jdata)
    const urlsn = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/nomenclature_employes_utilisation_sauve.php`
    const response = await axios.post(urlsn, jdata, {
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
    getDataEmployesUtilisationListe(lesData)
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
