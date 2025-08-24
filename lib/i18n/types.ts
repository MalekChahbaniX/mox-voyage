export type Language = "fr" | "en" | "ar"

export interface TranslationKeys {
  // Navigation
  nav: {
    home: string
    destinations: string
    about: string
    testimonials: string
    contact: string
    requestQuote: string
  }

  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    submit: string
    close: string
    readMore: string
    learnMore: string
    viewAll: string
    back: string
    next: string
    previous: string
  }

  // Homepage
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    features: {
      title: string
      expertise: {
        title: string
        description: string
      }
      personalized: {
        title: string
        description: string
      }
      support: {
        title: string
        description: string
      }
    }
    destinations: {
      title: string
      subtitle: string
    }
  }

  // Quote Modal
  quote: {
    title: string
    subtitle: string
    form: {
      firstName: string
      lastName: string
      email: string
      phone: string
      destination: string
      destinationPlaceholder: string
      travelType: string
      departureDate: string
      returnDate: string
      travelers: string
      budget: string
      accommodation: string
      activities: string
      specialRequests: string
      specialRequestsPlaceholder: string
    }
    travelTypes: {
      leisure: string
      business: string
      honeymoon: string
      family: string
      adventure: string
      cultural: string
    }
    travelers: {
      one: string
      two: string
      three: string
      four: string
      fivePlus: string
    }
    budget: {
      under1000: string
      range1000to2500: string
      range2500to5000: string
      range5000to10000: string
      over10000: string
    }
    accommodation: {
      hotel: string
      resort: string
      apartment: string
      villa: string
      hostel: string
      mixed: string
    }
    activities: {
      sightseeing: string
      adventure: string
      relaxation: string
      culture: string
    }
    buttons: {
      cancel: string
      submit: string
      submitting: string
    }
    messages: {
      success: string
      error: string
    }
  }
}
