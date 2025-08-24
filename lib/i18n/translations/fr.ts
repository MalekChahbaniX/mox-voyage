import type { TranslationKeys } from "../types"

export const fr: TranslationKeys = {
  nav: {
    home: "Accueil",
    destinations: "Destinations",
    about: "À propos",
    testimonials: "Témoignages",
    contact: "Contact",
    requestQuote: "Demander un devis",
  },

  common: {
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    submit: "Envoyer",
    close: "Fermer",
    readMore: "Lire plus",
    learnMore: "En savoir plus",
    viewAll: "Voir tout",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
  },

  home: {
    hero: {
      title: "Découvrez le monde avec Mox Voyage",
      subtitle: "Votre agence de voyage de confiance pour des expériences inoubliables à travers le monde",
      cta: "Explorez nos destinations",
    },
    features: {
      title: "Pourquoi choisir Mox Voyage ?",
      expertise: {
        title: "Expertise Mondiale",
        description: "Plus de 15 ans d'expérience dans l'organisation de voyages exceptionnels",
      },
      personalized: {
        title: "Voyages Personnalisés",
        description: "Chaque voyage est conçu selon vos goûts et votre budget",
      },
      support: {
        title: "Support 24/7",
        description: "Notre équipe est disponible à tout moment pour vous accompagner",
      },
    },
    destinations: {
      title: "Destinations Populaires",
      subtitle: "Découvrez nos destinations les plus prisées",
    },
  },

  quote: {
    title: "Demander un devis",
    subtitle: "Créons ensemble votre voyage de rêve",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      destination: "Destination souhaitée",
      destinationPlaceholder: "Ex: Paris, Tokyo, Bali...",
      travelType: "Type de voyage",
      departureDate: "Date de départ",
      returnDate: "Date de retour",
      travelers: "Nombre de voyageurs",
      budget: "Budget approximatif",
      accommodation: "Type d'hébergement",
      activities: "Activités souhaitées",
      specialRequests: "Demandes spéciales",
      specialRequestsPlaceholder: "Allergies, besoins spéciaux, préférences particulières...",
    },
    travelTypes: {
      leisure: "Loisirs",
      business: "Affaires",
      honeymoon: "Lune de miel",
      family: "Famille",
      adventure: "Aventure",
      cultural: "Culturel",
    },
    travelers: {
      one: "1 personne",
      two: "2 personnes",
      three: "3 personnes",
      four: "4 personnes",
      fivePlus: "5+ personnes",
    },
    budget: {
      under1000: "Moins de 1 000€",
      range1000to2500: "1 000€ - 2 500€",
      range2500to5000: "2 500€ - 5 000€",
      range5000to10000: "5 000€ - 10 000€",
      over10000: "Plus de 10 000€",
    },
    accommodation: {
      hotel: "Hôtel",
      resort: "Resort",
      apartment: "Appartement",
      villa: "Villa",
      hostel: "Auberge",
      mixed: "Mixte",
    },
    activities: {
      sightseeing: "Visites",
      adventure: "Aventure",
      relaxation: "Détente",
      culture: "Culture",
    },
    buttons: {
      cancel: "Annuler",
      submit: "Envoyer la demande",
      submitting: "Envoi en cours...",
    },
    messages: {
      success: "Votre demande de devis a été envoyée avec succès!",
      error: "Une erreur s'est produite. Veuillez réessayer.",
    },
  },
}
