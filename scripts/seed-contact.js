const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

// Contact submissions data
const contactSubmissions = [
  {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    travelType: "leisure",
    destination: "Tunisia",
    budget: "2000-3000",
    travelers: "2",
    travelDate: "2024-05-15",
    message: "Nous aimerions découvrir la culture tunisienne et visiter les sites historiques.",
    newsletter: true,
    status: "new"
  },
  {
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@email.com",
    phone: "+33 6 23 45 67 89",
    travelType: "adventure",
    destination: "Santorini",
    budget: "3000-4000",
    travelers: "2",
    travelDate: "2024-06-20",
    message: "Nous cherchons un voyage romantique avec des activités d'aventure.",
    newsletter: true,
    status: "contacted"
  },
  {
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@email.com",
    phone: "+33 6 34 56 78 90",
    travelType: "family",
    destination: "Bali",
    budget: "4000-5000",
    travelers: "4",
    travelDate: "2024-07-10",
    message: "Voyage en famille avec 2 enfants. Nous cherchons des activités adaptées.",
    newsletter: false,
    status: "quoted"
  },
  {
    firstName: "Sophie",
    lastName: "Laurent",
    email: "sophie.laurent@email.com",
    phone: "+33 6 45 67 89 01",
    travelType: "business",
    destination: "Dubai",
    budget: "5000+",
    travelers: "1",
    travelDate: "2024-04-05",
    message: "Voyage d'affaires avec quelques jours de tourisme.",
    newsletter: true,
    status: "booked"
  },
  {
    firstName: "Nicolas",
    lastName: "Petit",
    email: "nicolas.petit@email.com",
    phone: "+33 6 56 78 90 12",
    travelType: "leisure",
    destination: "Machu Picchu",
    budget: "3000-4000",
    travelers: "2",
    travelDate: "2024-09-15",
    message: "Rêvons de visiter le Machu Picchu depuis longtemps.",
    newsletter: true,
    status: "new"
  },
  {
    firstName: "Isabelle",
    lastName: "Roux",
    email: "isabelle.roux@email.com",
    phone: "+33 6 67 89 01 23",
    travelType: "cultural",
    destination: "Kyoto",
    budget: "2500-3500",
    travelers: "1",
    travelDate: "2024-11-20",
    message: "Je souhaite m'immerger dans la culture japonaise traditionnelle.",
    newsletter: false,
    status: "contacted"
  }
];

async function seedContactSubmissions() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Clear existing contact submissions
    await db.collection('contactSubmissions').deleteMany({});
    console.log('Cleared existing contact submissions');
    
    // Add timestamps and IDs
    const contactsWithTimestamps = contactSubmissions.map((contact, index) => ({
      ...contact,
      id: `contact_${Date.now()}_${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert contact submissions
    const result = await db.collection('contactSubmissions').insertMany(contactsWithTimestamps);
    console.log(`Inserted ${result.insertedCount} contact submissions`);
    
    // Create indexes for better performance
    await db.collection('contactSubmissions').createIndex({ status: 1 });
    await db.collection('contactSubmissions').createIndex({ createdAt: -1 });
    await db.collection('contactSubmissions').createIndex({ email: 1 });
    
    console.log('Created indexes for better performance');
    console.log('Contact submissions seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding contact submissions:', error);
  } finally {
    await client.close();
  }
}

// Run the seed function
seedContactSubmissions();
