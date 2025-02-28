import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const data = defineStore('iddata', () => {
  const idEmployeUser = ref(0);
  const nomEmployeUser = ref('');
  const prenomEmployeUser = ref('');
  const loginEmployeUser = ref('');
  const groupeSecurite = ref('');
  const bInGroupe = ref(0);
  const idUniteOrg = ref(0);
  const uniteOrg = ref('');
  const unitesorg = ref([]);
  const idEmployeUtilisationChoix = ref(0);
  const employesCreation = ref([]);
  const critereEmployes = ref('');
  const critereEmployesInactifs = ref(false);
  const employesListe = ref([]);
  const idEmployeChoix = ref(0);
  const messageErreur = ref('');

  return {
    idEmployeUser,
    nomEmployeUser,
    prenomEmployeUser,
    loginEmployeUser,
    groupeSecurite,
    bInGroupe,
    idUniteOrg,
    uniteOrg,
    unitesorg,
    idEmployeUtilisationChoix,
    employesCreation,
    critereEmployes,
    critereEmployesInactifs,
    employesListe,
    idEmployeChoix,
    messageErreur
  };
});
