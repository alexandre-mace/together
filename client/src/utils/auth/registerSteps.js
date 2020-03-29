import * as Yup from 'yup';

import WizardUserFormGeneralInformationPage from "../../components/auth/molecules/WizardUserFormGeneralInformationPage";
import WizardFormContactInformationPage from "../../components/auth/molecules/WizardUserFormContactInformationPage";
import WizardUserFormSecurityPage from "../../components/auth/molecules/WizardUserFormSecurityPage";
import WizardUserFormStatusPage from "../../components/auth/molecules/WizardUserFormStatusPage";

export default [
  {
    id: 'status',
    component: WizardUserFormStatusPage,
    initialValues: {
      status: '',
    },
    validationSchema: Yup.object().shape({
      status: Yup.string()
        .required('Le status est requis'),
    }),
  },
  {
    id: 'ids',
    component: WizardUserFormGeneralInformationPage,
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Le nom est requis'),
      email: Yup.string()
        .email('L\'addresse email est invalide')
        .required('L\'email est requis'),
    }),
  },
  {
    id: 'contact',
    component: WizardFormContactInformationPage,
    initialValues: {
      contactEmail: '',
      contactPhone: ''
    },
    validationSchema: Yup.object().shape({
    }),
  },
  {
    id: 'password',
    component: WizardUserFormSecurityPage,
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Le mot de passe est requis'),
      confirmPassword:  Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Le mot de passe de confirmation est requis')
    }),  },
]
