<template>
    <h3>Ajout d'employ&eacute;s<br><span v-if="lesData.idTypeAffaire > 0" class=typeaffaire>pour {{ lesData.typeAffaire }} ({{ lesData.idTypeAffaire }})</span></h3>
    <input type="text" v-model="state.critereEmployes" v-on:keyup="listeEmployes" placeholder="- nom pr&eacute;nom login -">&nbsp;
    <input type="checkbox" id="chkRetInactif" v-model="state.bRetInactif" v-on:change="listeEmployes"><label for="chkRetInactif">avec les employ&eacute;s d&eacute;sactiv&eacute;s</label>
    <ul>
        <template v-for="employe in lesData.employesListe" v-bind:key="employe.idemploye">
            <li>
                <span 
                    v-bind:id="'liemploye' + employe.idemploye" 
                    v-bind:class="'empbactif' + employe.bactif" 
                    v-bind:title="employe.directionabr + '-' + employe.serviceabr + ' - ' + employe.unite"
                    v-on:click="chargeEmployecreationAjout(employe.idemploye)"
                >
                    {{employe.nom}} {{employe.prenom}}&nbsp; 
                    <span class="emplogin">({{employe.login}})</span>
                </span>
            </li>
        </template>
    </ul>
</template>
<script setup>
    import {reactive, ref} from 'vue'
    import { data } from '@/stores/data.js'
    import { getDataEmployesListe } from '@/affopcdempcchargedroitcreation.js'
    import { sauveChargeEmployeCreation } from '@/affopcdempcchargedroitcreation.js'
   let state = reactive({
        critereEmployes: "",
        bRetInactif: false   
    })
    let lesData = data()
    function listeEmployes() {
        lesData.critereEmployes = ref(state.critereEmployes) 
        lesData.critereEmployesInactifs = ref(state.bRetInactif) 
        getDataEmployesListe(lesData)
    } 

    function chargeEmployecreationAjout(idEmploye) {
        lesData.idEmployeChoix = ref(idEmploye)
        const oEl = document.getElementById(`liemploye${idEmploye}`)
        oEl.classList.add("empchoisi");
        sauveChargeEmployeCreation(idEmploye, lesData)
    }

</script>