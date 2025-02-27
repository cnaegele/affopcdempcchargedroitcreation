<template>
    <h3>Unités organisationnelles</h3>
    <ul>
        <template v-for="uniteorg in lesData.unitesorg" v-bind:key="uniteorg.iduniteorg">
            <li v-if="uniteorg.nbrcharge18m > 0" v-on:click="listeEmployeUtilisation(uniteorg.iduniteorg, uniteorg.uniteorg)">
                <span>{{ uniteorg.uniteorg }}</span>&nbsp;
                <span title="nombre de charges crées les 18 derniers mois">({{ uniteorg.nbrcharge18m }})</span>
            </li>
        </template>
        <template v-for="uniteorg in lesData.unitesorg" v-bind:key="uniteorg.iduniteorg">
            <li v-if="uniteorg.nbrcharge18m == 0" v-on:click="listeEmployeUtilisation(uniteorg.iduniteorg, uniteorg.uniteorg)">
                <span class="zerocharge">{{ uniteorg.uniteorg }}</span>&nbsp;
                <span title="nombre de charges crées les 18 derniers mois">({{ uniteorg.nbrcharge18m }})</span>
            </li>
        </template>
    </ul>
 </template>

<script setup>
    import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    import { getDataUnitesOrgListe } from '@/affopcdempcchargedroitcreation.js'
    import { getDataEmployesUtilisationListe } from '@/affopcdempcchargedroitcreation.js'
    const lesData = data()
    getDataUnitesOrgListe(lesData)

    function listeEmployeUtilisation(idNomenclature, nomenclature) {
        lesData.idNomenclature = ref(idNomenclature)
        lesData.nomenclature = ref(nomenclature)
        getDataEmployesUtilisationListe(lesData)

        const oEl = document.getElementById(`liemploye${lesData.idEmployeChoix}`)
        if (oEl !== null) {
            oEl.classList.remove("empchoisi");
        }

    }
 </script>

<style scoped>
.zerocharge {
  font-style: italic;
}
</style>