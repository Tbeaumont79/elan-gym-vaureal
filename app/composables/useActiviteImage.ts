export interface AmbianceVisuel {
  name: string
  alt: string
}

/**
 * Visuel d'ambiance (libre de droits) associé à chaque activité, par slug.
 * Ce sont des illustrations neutres — PAS des photos du club (alt explicites).
 * Sources & licences : public/CREDITS-IMAGES.md.
 */
const PAR_SLUG: Record<string, AmbianceVisuel> = {
  'petite-enfance': { name: 'enfants', alt: 'Jeunes enfants en éveil gymnique dans un gymnase (image d\'illustration)' },
  'ecole-de-gym': { name: 'sol', alt: 'Gymnaste à l\'entraînement aux agrès (image d\'illustration)' },
  loisirs: { name: 'club', alt: 'Gymnastique en ambiance conviviale dans un gymnase (image d\'illustration)' },
  'pre-competition': { name: 'barres', alt: 'Gymnaste aux barres dans un gymnase (image d\'illustration)' },
  competition: { name: 'poutre', alt: 'Gymnaste à la poutre dans un gymnase (image d\'illustration)' },
  adultes: { name: 'barres', alt: 'Gymnastique aux agrès dans un gymnase (image d\'illustration)' },
}

const DEFAUT: AmbianceVisuel = {
  name: 'club',
  alt: 'Ambiance gymnastique dans un gymnase (image d\'illustration)',
}

/** Retourne le visuel d'ambiance d'une activité depuis son slug (ou un repli neutre). */
export const useActiviteImage = (slug: string): AmbianceVisuel => PAR_SLUG[slug] ?? DEFAUT
