<template>
    <h3>Employes autoris&eacute;s<br><span v-if="lesData.idNomenclature > 0" class=nomenclature>pour {{ lesData.nomenclature }} ({{ lesData.idNomenclature }})</span></h3>
    <ul>
        <template v-for="employeUtilisation in lesData.employesUtilisation" v-bind:key="employeUtilisation.idemploye">
            <li>
                <span class="spnbtnsuppr"><button v-on:click="nomenclatureEmployeUtilisationSupprime(employeUtilisation.idemploye)">x</button></span>&nbsp;
                <span v-bind:title="employeUtilisation.uniteorganisationnelle">{{ employeUtilisation.employe }}</span>&nbsp;
                <span title="nombre de cr&eacute;ation">[{{employeUtilisation.nombrecreationsdoc}}]</span>&nbsp;
                <span v-if="employeUtilisation.bfavori == 0" style="color: red;" title="ajouter la nomenclature dans les nomenclatures favorites">*!!*</span>
            </li>
        </template>
    </ul>
</template>
<script setup>
    import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    import { supprimeNomenclatureEmployeUtilisation } from '@/affopcdempcchargedroitcreation.js'
    let lesData = data()

    function nomenclatureEmployeUtilisationSupprime(idEmploye) {
        lesData.idEmployeUtilisationChoix = ref(idEmploye)
        supprimeNomenclatureEmployeUtilisation(idEmploye, lesData)
    }
 </script>
