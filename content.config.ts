import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * Schéma de contenu éditable via Nuxt Studio.
 *
 * Chaque collection génère automatiquement un formulaire d'édition dans Studio
 * (champs balisés, titres, dates, horaires…). On édite le CONTENU, pas la structure.
 */
export default defineContentConfig({
  collections: {
    // Pages éditoriales simples : Accueil, Notre salle, Accès & contact, Équipement…
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        // Image d'en-tête optionnelle (chemin dans /public ou média Studio).
        hero: z.string().optional(),
        // Ordre d'affichage si listé.
        order: z.number().optional(),
      }),
    }),

    // Fiches Activité, une par tranche d'âge.
    activites: defineCollection({
      type: 'page',
      source: 'activites/**/*.md',
      schema: z.object({
        title: z.string(),
        // Tranche d'âge affichée (ex. « 2-4 ans »).
        age: z.string(),
        description: z.string(),
        // Horaire(s) de la discipline (texte libre, ex. « Mercredi 10h-11h »).
        horaire: z.string().optional(),
        image: z.string().optional(),
        // Ordre d'affichage dans la liste des activités.
        order: z.number().default(0),
      }),
    }),

    // Données structurées : créneaux horaires (tableau éditable).
    horaires: defineCollection({
      type: 'data',
      source: 'horaires/**/*.yml',
      schema: z.object({
        creneaux: z.array(
          z.object({
            activite: z.string(),
            jour: z.string(),
            heure: z.string(),
            public: z.string().optional(),
          }),
        ),
      }),
    }),

    // Données structurées : dates de compétitions.
    competitions: defineCollection({
      type: 'data',
      source: 'competitions/**/*.yml',
      schema: z.object({
        dates: z.array(
          z.object({
            date: z.string(),
            intitule: z.string(),
            lieu: z.string().optional(),
            niveau: z.string().optional(),
          }),
        ),
      }),
    }),

    // Galerie : photos et vidéos (embed).
    galerie: defineCollection({
      type: 'data',
      source: 'galerie/**/*.yml',
      schema: z.object({
        photos: z
          .array(z.object({ src: z.string(), legende: z.string().optional() }))
          .optional(),
        videos: z
          .array(z.object({ url: z.string(), titre: z.string().optional() }))
          .optional(),
      }),
    }),
  },
})
