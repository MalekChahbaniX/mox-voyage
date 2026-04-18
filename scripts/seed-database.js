const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

// Tunisia destinations with real image URLs
const tunisiaDestinations = [
  {
    name: "Sidi Bou Said",
    region: "Tunis",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop",
    price: 299,
    currency: "TND",
    duration: "3 days",
    rating: 4.8,
    reviews: 245,
    description: "The iconic blue and white village perched on a cliff overlooking the Mediterranean Sea. Known for its Andalusian architecture, art galleries, and stunning sunset views.",
    highlights: ["Blue and white architecture", "Mediterranean views", "Art galleries", "Traditional cafes"],
    category: "Cultural",
    featured: true
  },
  {
    name: "Carthage",
    region: "Tunis",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    price: 450,
    currency: "TND",
    duration: "4 days",
    rating: 4.9,
    reviews: 312,
    description: "Ancient Phoenician city and UNESCO World Heritage site. Explore the impressive Roman ruins, including the Antonine Baths and the Carthage National Museum.",
    highlights: ["UNESCO World Heritage", "Roman ruins", "Archaeological museum", "Mediterranean coast"],
    category: "Historical",
    featured: true
  },
  {
    name: "Dougga",
    region: "Béja",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1596445836565-7b6eda8db472?w=800&h=600&fit=crop",
    price: 380,
    currency: "TND",
    duration: "2 days",
    rating: 4.7,
    reviews: 189,
    description: "One of the best-preserved Roman towns in North Africa. The impressive Capitol, theater, and triumphal arch showcase the grandeur of Roman architecture.",
    highlights: ["Roman theater", "Capitol temple", "Triumphal arch", "Mountain views"],
    category: "Historical",
    featured: false
  },
  {
    name: "Kairouan",
    region: "Kairouan",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&h=600&fit=crop",
    price: 320,
    currency: "TND",
    duration: "3 days",
    rating: 4.6,
    reviews: 156,
    description: "The fourth holiest city in Islam and UNESCO World Heritage site. Visit the Great Mosque, the Aghlabid Basins, and explore the medina's traditional crafts.",
    highlights: ["Great Mosque", "Islamic architecture", "Traditional carpets", "Medina markets"],
    category: "Religious",
    featured: true
  },
  {
    name: "Sousse Medina",
    region: "Sousse",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
    price: 280,
    currency: "TND",
    duration: "2 days",
    rating: 4.5,
    reviews: 203,
    description: "Historic walled city with stunning Ribat fortress and beautiful Mediterranean beaches. Explore the narrow streets, traditional souks, and the Archaeological Museum.",
    highlights: ["Ribat fortress", "Medina walls", "Beach access", "Traditional souks"],
    category: "Cultural",
    featured: false
  },
  {
    name: "Matmata",
    region: "Gabès",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    price: 420,
    currency: "TND",
    duration: "3 days",
    rating: 4.4,
    reviews: 127,
    description: "Famous for its unique underground troglodyte houses. Star Wars fans will recognize this as the filming location for Luke Skywalker's home on Tatooine.",
    highlights: ["Underground homes", "Star Wars filming location", "Berber culture", "Desert landscape"],
    category: "Adventure",
    featured: false
  },
  {
    name: "Djerba Island",
    region: "Medenine",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    price: 550,
    currency: "TND",
    duration: "5 days",
    rating: 4.7,
    reviews: 298,
    description: "The 'Island of Dreams' with pristine beaches, historic synagogues, and charming fishing villages. Perfect for relaxation and water sports.",
    highlights: ["Pristine beaches", "Ghriba Synagogue", "Fishing villages", "Water sports"],
    category: "Beach",
    featured: true
  },
  {
    name: "Tozeur",
    region: "Tozeur",
    country: "Tunisia",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    price: 480,
    currency: "TND",
    duration: "4 days",
    rating: 4.6,
    reviews: 167,
    description: "Gateway to the Sahara Desert with stunning oasis landscapes and unique brick architecture. Experience the magic of the desert and visit Star Wars filming locations.",
    highlights: ["Sahara Desert", "Oasis palm groves", "Star Wars sets", "Chott El Jerid"],
    category: "Adventure",
    featured: false
  }
];

// World destinations with real image URLs
const worldDestinations = [
  {
    name: "Santorini",
    region: "Cyclades",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
    price: 1250,
    currency: "EUR",
    duration: "7 days",
    rating: 4.9,
    reviews: 567,
    description: "Iconic Greek island with white-washed buildings, blue-domed churches, and breathtaking sunsets over the caldera. A paradise for photographers and romantics.",
    highlights: ["Caldera views", "Sunset in Oia", "Wine tasting", "Black sand beaches"],
    category: "Beach",
    featured: true
  },
  {
    name: "Machu Picchu",
    region: "Cusco",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
    price: 2100,
    currency: "USD",
    duration: "8 days",
    rating: 4.9,
    reviews: 892,
    description: "Ancient Incan citadel set high in the Andes Mountains. One of the most iconic archaeological sites in the world, offering stunning mountain vistas and rich history.",
    highlights: ["Incan ruins", "Huayna Picchu climb", "Sacred Valley", "Andean mountains"],
    category: "Adventure",
    featured: true
  },
  {
    name: "Kyoto",
    region: "Kansai",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    price: 1850,
    currency: "USD",
    duration: "10 days",
    rating: 4.8,
    reviews: 723,
    description: "Cultural heart of Japan with thousands of temples, traditional gardens, and geisha districts. Experience the perfect blend of ancient tradition and modern innovation.",
    highlights: ["Fushimi Inari shrine", "Bamboo groves", "Traditional tea houses", "Cherry blossoms"],
    category: "Cultural",
    featured: true
  },
  {
    name: "Dubai",
    region: "Emirate of Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    price: 1650,
    currency: "USD",
    duration: "6 days",
    rating: 4.7,
    reviews: 634,
    description: "Futuristic metropolis with record-breaking architecture, luxury shopping, and desert adventures. Experience the ultimate blend of modern luxury and Arabian culture.",
    highlights: ["Burj Khalifa", "Desert safari", "Gold Souk", "Palm Jumeirah"],
    category: "Luxury",
    featured: false
  },
  {
    name: "Bali",
    region: "Lesser Sunda Islands",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
    price: 980,
    currency: "USD",
    duration: "9 days",
    rating: 4.8,
    reviews: 845,
    description: "Tropical paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. A spiritual haven with rich cultural heritage.",
    highlights: ["Rice terraces", "Temple tours", "Beach clubs", "Traditional dance"],
    category: "Beach",
    featured: true
  },
  {
    name: "Paris",
    region: "Île-de-France",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    price: 1450,
    currency: "EUR",
    duration: "7 days",
    rating: 4.7,
    reviews: 1024,
    description: "The City of Light with world-class art, architecture, cuisine, and romance. From the Eiffel Tower to the Louvre, Paris offers unforgettable experiences.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine cruise", "Montmartre"],
    category: "Cultural",
    featured: true
  },
  {
    name: "New York City",
    region: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    price: 1780,
    currency: "USD",
    duration: "6 days",
    rating: 4.6,
    reviews: 912,
    description: "The city that never sleeps offers world-class museums, Broadway shows, iconic landmarks, and diverse neighborhoods. Experience the energy of the Big Apple.",
    highlights: ["Times Square", "Central Park", "Broadway shows", "Statue of Liberty"],
    category: "Urban",
    featured: false
  },
  {
    name: "Rome",
    region: "Lazio",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    price: 1320,
    currency: "EUR",
    duration: "7 days",
    rating: 4.8,
    reviews: 876,
    description: "Eternal City with nearly 3,000 years of globally influential art, architecture, and culture. From ancient ruins to Renaissance masterpieces, Rome is a living museum.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
    category: "Historical",
    featured: true
  },
  {
    name: "Iceland",
    region: "Reykjavik",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    price: 2200,
    currency: "USD",
    duration: "8 days",
    rating: 4.9,
    reviews: 543,
    description: "Land of fire and ice with dramatic landscapes including volcanoes, geysers, hot springs, and glaciers. Perfect for adventure seekers and nature lovers.",
    highlights: ["Northern Lights", "Blue Lagoon", "Glacier hiking", "Waterfalls"],
    category: "Adventure",
    featured: false
  },
  {
    name: "Maldives",
    region: "Kaafu Atoll",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1540202404-1b927e77f019?w=800&h=600&fit=crop",
    price: 3200,
    currency: "USD",
    duration: "7 days",
    rating: 4.9,
    reviews: 445,
    description: "Tropical paradise with crystal-clear waters, overwater bungalows, and vibrant coral reefs. The ultimate destination for luxury and relaxation.",
    highlights: ["Overwater villas", "Coral reefs", "Dolphin watching", "Spa treatments"],
    category: "Luxury",
    featured: true
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Clear existing destinations
    await db.collection('destinations').deleteMany({});
    console.log('Cleared existing destinations');
    
    // Combine all destinations
    const allDestinations = [...tunisiaDestinations, ...worldDestinations];
    
    // Add timestamps and IDs
    const destinationsWithTimestamps = allDestinations.map((dest, index) => ({
      ...dest,
      id: `dest_${Date.now()}_${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert destinations
    const result = await db.collection('destinations').insertMany(destinationsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} destinations`);
    
    // Create indexes for better performance
    await db.collection('destinations').createIndex({ country: 1 });
    await db.collection('destinations').createIndex({ category: 1 });
    await db.collection('destinations').createIndex({ featured: 1 });
    await db.collection('destinations').createIndex({ name: "text", description: "text" });
    
    console.log('Created indexes for better performance');
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

// Run the seed function
seedDatabase();
