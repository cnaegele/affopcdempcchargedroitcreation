
<template>
  <header>
    <h2>Gestion des droits de création des charges au permis de construire</h2>
  </header>

  <main>
    <div id="app">
      <div v-if="lesData.messageErreur != ''" id="divErreur">{{ lesData.messageErreur }}</div>
      <div><UserInformation groupeSecurite="GoelandManager"></UserInformation></div>
      <div v-if="lesData.bInGroupe == 0">Utilisation autoris&eacute;e uniquement aux membres du groupe {{ lesData.groupeSecurite }}</div>
      <div v-if="lesData.bInGroupe == 1" class="flex-container">
        <div>
          <UnitesOrgListe></UnitesOrgListe>
        </div>
         <div>
            <EmployesUtilisationListe></EmployesUtilisationListe>
        </div>
        <div>
            <EmployesListe></EmployesListe>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import UserInformation from '@/components/UserInformation.vue'
  import UnitesOrgListe from '@/components/UnitesOrgListe.vue'
  import EmployesUtilisationListe from '@/components/EmployesCreationListe.vue'
  import EmployesListe from '@/components/EmployesListe.vue'
  import { data } from '@/stores/data.js'
  const lesData = data()
</script>
