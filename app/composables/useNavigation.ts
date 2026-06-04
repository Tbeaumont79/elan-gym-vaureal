export interface NavItem {
  label: string
  to: string
  children?: NavItem[]
}

/**
 * Arborescence de navigation du site (reflète le menu du site actuel).
 * Structure gérée par le dev ; le contenu des pages est édité via Studio.
 */
export const useNavigation = (): NavItem[] => [
  { label: 'Accueil', to: '/' },
  { label: 'Notre salle', to: '/notre-salle' },
  {
    label: 'Nos activités',
    to: '/activites',
    children: [
      { label: 'Petite enfance (2-4 ans)', to: '/activites/petite-enfance' },
      { label: 'École de gym (5-6 ans)', to: '/activites/ecole-de-gym' },
      { label: 'Loisirs (dès 7 ans)', to: '/activites/loisirs' },
      { label: 'Pré-compétition (dès 7 ans)', to: '/activites/pre-competition' },
      { label: 'Compétition & collectifs', to: '/activites/competition' },
      { label: 'Adultes', to: '/activites/adultes' },
    ],
  },
  {
    label: 'Infos utiles',
    to: '/horaires',
    children: [
      { label: 'Horaires', to: '/horaires' },
      { label: 'Accès & contact', to: '/acces-contact' },
    ],
  },
  {
    label: 'Compétitions',
    to: '/competitions',
    children: [
      { label: 'Dates des compétitions', to: '/competitions' },
      { label: 'Équipement', to: '/equipement' },
      { label: 'Vidéos', to: '/galerie' },
    ],
  },
  { label: 'Galerie', to: '/galerie' },
]

/**
 * Lien sortant HelloAsso (adhésions/paiements — hors périmètre vitrine).
 * URL vérifiée le 2026-06-04 (recherche web — page officielle du club). Confirmée.
 */
export const HELLOASSO_URL =
  'https://www.helloasso.com/associations/elan-gymnique-de-vaureal'

/** Réseaux sociaux. */
export const FACEBOOK_URL = 'https://www.facebook.com/ElanGymniquedeVaureal'

/**
 * Crédit d'agence affiché dans le pied de page (contrepartie pilote).
 * Décision de marque en attente (THI-15) : tant que `name` est `null`, la mention
 * est masquée — on ne publie pas de placeholder visible. Pour l'activer, renseigner
 * `name` (et `url` optionnel) ; c'est l'unique endroit à modifier.
 */
export const AGENCY: { name: string | null; url?: string } = {
  name: null,
}
