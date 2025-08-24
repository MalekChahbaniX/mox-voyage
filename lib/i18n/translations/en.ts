import type { TranslationKeys } from "../types"

export const en: TranslationKeys = {
  nav: {
    home: "Home",
    destinations: "Destinations",
    about: "About",
    testimonials: "Testimonials",
    contact: "Contact",
    requestQuote: "Request Quote",
  },

  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    submit: "Submit",
    close: "Close",
    readMore: "Read more",
    learnMore: "Learn more",
    viewAll: "View all",
    back: "Back",
    next: "Next",
    previous: "Previous",
  },

  home: {
    hero: {
      title: "Discover the World with Mox Voyage",
      subtitle: "Your trusted travel agency for unforgettable experiences around the world",
      cta: "Explore our destinations",
    },
    features: {
      title: "Why Choose Mox Voyage?",
      expertise: {
        title: "Global Expertise",
        description: "Over 15 years of experience organizing exceptional trips",
      },
      personalized: {
        title: "Personalized Travel",
        description: "Every trip is designed according to your tastes and budget",
      },
      support: {
        title: "24/7 Support",
        description: "Our team is available anytime to assist you",
      },
    },
    destinations: {
      title: "Popular Destinations",
      subtitle: "Discover our most sought-after destinations",
    },
  },

  quote: {
    title: "Request a Quote",
    subtitle: "Let's create your dream trip together",
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      destination: "Desired Destination",
      destinationPlaceholder: "Ex: Paris, Tokyo, Bali...",
      travelType: "Travel Type",
      departureDate: "Departure Date",
      returnDate: "Return Date",
      travelers: "Number of Travelers",
      budget: "Approximate Budget",
      accommodation: "Accommodation Type",
      activities: "Desired Activities",
      specialRequests: "Special Requests",
      specialRequestsPlaceholder: "Allergies, special needs, particular preferences...",
    },
    travelTypes: {
      leisure: "Leisure",
      business: "Business",
      honeymoon: "Honeymoon",
      family: "Family",
      adventure: "Adventure",
      cultural: "Cultural",
    },
    travelers: {
      one: "1 person",
      two: "2 people",
      three: "3 people",
      four: "4 people",
      fivePlus: "5+ people",
    },
    budget: {
      under1000: "Under €1,000",
      range1000to2500: "€1,000 - €2,500",
      range2500to5000: "€2,500 - €5,000",
      range5000to10000: "€5,000 - €10,000",
      over10000: "Over €10,000",
    },
    accommodation: {
      hotel: "Hotel",
      resort: "Resort",
      apartment: "Apartment",
      villa: "Villa",
      hostel: "Hostel",
      mixed: "Mixed",
    },
    activities: {
      sightseeing: "Sightseeing",
      adventure: "Adventure",
      relaxation: "Relaxation",
      culture: "Culture",
    },
    buttons: {
      cancel: "Cancel",
      submit: "Send Request",
      submitting: "Sending...",
    },
    messages: {
      success: "Your quote request has been sent successfully!",
      error: "An error occurred. Please try again.",
    },
  },
}
