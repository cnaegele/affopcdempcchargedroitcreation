<template>
    <h3>Employes autoris&eacute;s pour<br>{{ lesData.uniteOrg }}</h3>
    <div class="flex-table">
        <template v-for="employeCreation in lesData.employesCreation" v-bind:key="employeCreation.idemploye">
            <div class="row">
              <div class="cell col-small">
              <span v-if="employeCreation.nbrchargeref === 0" class="spnbtnsuppr"><button v-on:click="employeCreationSupprime(employeCreation.idemploye)">x</button></span>
              </div>
              <div class="cell col-large">
                  <span :class="{'employedesactive' : employeCreation.bactifemploye === 0 }" v-bind:title="employeCreation.uniteorgemploye">{{ employeCreation.nomemploye }}</span>&nbsp;
              </div>
              <div class="cell col-medium">
                  <span title="nombre de cr&eacute;ations/r&eacute;f&eacute;rences">[{{employeCreation.nbrchargecre}}/{{employeCreation.nbrchargeref}}]</span>&nbsp;
              </div>
              <div class="cell col-small">
                  <input 
                      type="checkbox" 
                      v-model="employeCreation.boolActifChargeCre" 
                      @change="employeCreationModifie(employeCreation)"
                      class="mr-2"
                  />
              </div>                
              <div class="cell col-small">
                  <input 
                      type="text" 
                      v-model="employeCreation.iddocct" 
                      @change="employeCreationModifie(employeCreation)"
                      maxlength="8"
                      class="numdocct"
                  />
              </div>
            </div>
        </template>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    import { modifieChargeEmployeCreation, supprimeChargeEmployeCreation } from '@/affopcdempcchargedroitcreation.js'
    let lesData = data()

    function employeCreationModifie(employeCreation) {
      modifieChargeEmployeCreation(employeCreation, lesData)
    }

    function employeCreationSupprime(idEmploye) {
        supprimeChargeEmployeCreation(idEmploye, lesData)
    }
    
 </script>

<style scoped>
.flex-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
}

.row {
  display: flex;
}

.header {
  background-color: #f2f2f2;
  font-weight: bold;
}

.cell {
  flex: 1;
  padding: 8px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}
/* Définir différentes largeurs de colonnes */
.col-small {
  flex: 1; /* Largeur de base */
}

.col-medium {
  flex: 2; /* 2x plus large que col-small */
}

.col-large {
  flex: 4; /* 4x plus large que col-small */
}

.employedesactive {
  font-style: italic;
  color: grey;
}
.numdocct {
    width: 5em;
}
</style>