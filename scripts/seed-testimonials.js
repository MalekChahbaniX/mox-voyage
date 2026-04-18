const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

// Testimonials data with real images
const testimonials = [
  {
    name: "Marie Dubois",
    location: "Paris, France",
    destination: "Sidi Bou Said, Tunisia",
    date: "Septembre 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    review: "Un voyage absolument magique ! L'équipe de Mox Voyage a organisé chaque détail à la perfection. Les couleurs bleues et blanches de Sidi Bou Said sont encore plus belles en réalité.",
    highlights: ["Organisation parfaite", "Guides exceptionnels", "Expérience authentique"],
    verified: true,
    featured: true
  },
  {
    name: "Thomas Martin",
    location: "Lyon, France",
    destination: "Carthage, Tunisia",
    date: "Août 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    review: "La découverte des ruines de Carthage était une expérience inoubliable. Notre guide était passionnée et nous a fait revivre l'histoire de ce site exceptionnel.",
    highlights: ["Histoire fascinante", "Guide expert", "Site magnifique"],
    verified: true,
    featured: true
  },
  {
    name: "Sophie Laurent",
    location: "Marseille, France",
    destination: "Santorini, Greece",
    date: "Juillet 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    review: "Les couchers de soleil à Oia sont à couper le souffle ! Mox Voyage nous a trouvé un hôtel avec vue imprenable. Un séjour romantique parfait.",
    highlights: ["Coucher de soleil magique", "Hôtel de luxe", "Service impeccable"],
    verified: true,
    featured: true
  },
  {
    name: "Pierre Bernard",
    location: "Bordeaux, France",
    destination: "Machu Picchu, Peru",
    date: "Juin 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    review: "L'ascension du Huayna Picchu était un défi mais la vue depuis le sommet en valait la peine ! Organisation parfaite du trek et des hébergements.",
    highlights: ["Aventure incroyable", "Paysages à couper le souffle", "Encadrement professionnel"],
    verified: true,
    featured: false
  },
  {
    name: "Isabelle Moreau",
    location: "Toulouse, France",
    destination: "Kyoto, Japan",
    date: "Mai 2024",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    review: "Kyoto est une ville magnifique pleine de traditions. Les temples et les jardins sont superbes. Une immersion culturelle réussie grâce aux recommandations de Mox Voyage.",
    highlights: ["Culture japonaise", "Temples magnifiques", "Expérience authentique"],
    verified: true,
    featured: false
  },
  {
    name: "Nicolas Petit",
    location: "Nantes, France",
    destination: "Djerba Island, Tunisia",
    date: "Avril 2024",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    review: "Excellentes vacances à Djerba ! Plages magnifiques, hôtels de qualité et gens très accueillants. Parfait pour se détendre en famille.",
    highlights: ["Plages paradisiaques", "Hospitalité", "Rapport qualité-prix"],
    verified: true,
    featured: false
  },
  {
    name: "Camille Roux",
    location: "Lille, France",
    destination: "Dubai, UAE",
    date: "Mars 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    review: "Dubai est une ville futuriste impressionnante ! Le Burj Khalifa et les malls sont spectaculaires. Mox Voyage a bien organisé notre séjour premium.",
    highlights: ["Luxure", "Architecture moderne", "Shopping exceptionnel"],
    verified: true,
    featured: true
  },
  {
    name: "David Lefebvre",
    location: "Strasbourg, France",
    destination: "Bali, Indonesia",
    date: "Février 2024",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    review: "Bali est vraiment une île paradisiaque ! Les rizières en terrasses, les temples et les plages sont magnifiques. Un voyage spirituel et dépaysant.",
    highlights: ["Paysages variés", "Spiritualité", "Gastronomie locale"],
    verified: true,
    featured: false
  }
];

async function seedTestimonials() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Clear existing testimonials
    await db.collection('testimonials').deleteMany({});
    console.log('Cleared existing testimonials');
    
    // Add timestamps and IDs
    const testimonialsWithTimestamps = testimonials.map((testimonial, index) => ({
      ...testimonial,
      id: `test_${Date.now()}_${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert testimonials
    const result = await db.collection('testimonials').insertMany(testimonialsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} testimonials`);
    
    // Create indexes for better performance
    await db.collection('testimonials').createIndex({ destination: 1 });
    await db.collection('testimonials').createIndex({ featured: 1 });
    await db.collection('testimonials').createIndex({ rating: -1 });
    await db.collection('testimonials').createIndex({ verified: 1 });
    
    console.log('Created indexes for better performance');
    console.log('Testimonials seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  } finally {
    await client.close();
  }
}

// Run the seed function
seedTestimonials();
