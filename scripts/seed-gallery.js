const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

// Gallery data with real images
const galleryItems = [
    {
        title: "Sidi Bou Said Sunset",
        destination: "Sidi Bou Said, Tunisia",
        category: "Architecture",
        date: "September 2024",
        image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop",
        photographer: "Marie Dubois",
        likes: 245,
        description: "The iconic blue and white village of Sidi Bou Said bathed in golden sunset light.",
        featured: true
    },
    {
        title: "Carthage Ancient Theater",
        destination: "Carthage, Tunisia",
        category: "Historical",
        date: "August 2024",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        photographer: "Thomas Martin",
        likes: 189,
        description: "The ancient Roman theater of Carthage with stunning Mediterranean views.",
        featured: true
    },
    {
        title: "Dougga Roman Capitol",
        destination: "Dougga, Tunisia",
        category: "Archaeological",
        date: "July 2024",
        image: "https://images.unsplash.com/photo-1596445836565-7b6eda8db472?w=800&h=600&fit=crop",
        photographer: "Sophie Laurent",
        likes: 156,
        description: "The impressive Capitol temple in the well-preserved Roman town of Dougga.",
        featured: false
    },
    {
        title: "Kairouan Great Mosque",
        destination: "Kairouan, Tunisia",
        category: "Religious",
        date: "June 2024",
        image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&h=600&fit=crop",
        photographer: "Pierre Bernard",
        likes: 203,
        description: "The magnificent Great Mosque of Kairouan, one of Islam's holiest sites.",
        featured: true
    },
    {
        title: "Santorini Blue Domes",
        destination: "Santorini, Greece",
        category: "Architecture",
        date: "May 2024",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
        photographer: "Isabelle Moreau",
        likes: 342,
        description: "The iconic blue-domed churches of Santorini against the Aegean Sea.",
        featured: true
    },
    {
        title: "Machu Picchu Sunrise",
        destination: "Machu Picchu, Peru",
        category: "Adventure",
        date: "April 2024",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
        photographer: "Nicolas Petit",
        likes: 428,
        description: "The ancient Incan citadel of Machu Picchu at sunrise through the morning mist.",
        featured: true
    },
    {
        title: "Fushimi Inari Torii Gates",
        destination: "Kyoto, Japan",
        category: "Cultural",
        date: "March 2024",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
        photographer: "Camille Roux",
        likes: 367,
        description: "Thousands of vibrant red torii gates at Fushimi Inari shrine in Kyoto.",
        featured: false
    },
    {
        title: "Dubai Skyline at Night",
        destination: "Dubai, UAE",
        category: "Urban",
        date: "February 2024",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
        photographer: "David Lefebvre",
        likes: 298,
        description: "The spectacular Dubai skyline illuminated at night with Burj Khalifa dominating.",
        featured: false
    },
    {
        title: "Bali Rice Terraces",
        destination: "Bali, Indonesia",
        category: "Landscape",
        date: "January 2024",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
        photographer: "Marie Dubois",
        likes: 412,
        description: "The stunning emerald rice terraces of Tegallalang in Bali.",
        featured: true
    },
    {
        title: "Eiffel Tower Twilight",
        destination: "Paris, France",
        category: "Landmark",
        date: "December 2023",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
        photographer: "Thomas Martin",
        likes: 389,
        description: "The Eiffel Tower sparkling against the twilight Parisian sky.",
        featured: false
    },
    {
        title: "Northern Lights Iceland",
        destination: "Iceland",
        category: "Nature",
        date: "November 2023",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        photographer: "Sophie Laurent",
        likes: 456,
        description: "The spectacular aurora borealis dancing across the Icelandic sky.",
        featured: true
    },
    {
        title: "Maldives Overwater Villa",
        destination: "Maldives",
        category: "Luxury",
        date: "October 2023",
        image: "https://images.unsplash.com/photo-1540202404-1b927e77f019?w=800&h=600&fit=crop",
        photographer: "Pierre Bernard",
        likes: 523,
        description: "Luxurious overwater villa in the crystal-clear waters of the Maldives.",
        featured: true
    }
];

async function seedGallery() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Clear existing gallery items
    await db.collection('gallery').deleteMany({});
    console.log('Cleared existing gallery items');
    
    // Add timestamps and IDs
    const galleryItemsWithTimestamps = galleryItems.map((item, index) => ({
      ...item,
      id: `gallery_${Date.now()}_${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert gallery items
    const result = await db.collection('gallery').insertMany(galleryItemsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} gallery items`);
    
    // Create indexes for better performance
    await db.collection('gallery').createIndex({ destination: 1 });
    await db.collection('gallery').createIndex({ category: 1 });
    await db.collection('gallery').createIndex({ featured: 1 });
    await db.collection('gallery').createIndex({ likes: -1 });
    
    console.log('Created indexes for better performance');
    console.log('Gallery seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding gallery:', error);
  } finally {
    await client.close();
  }
}

// Run the seed function
seedGallery();
