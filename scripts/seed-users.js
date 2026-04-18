const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

async function seedUsers() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Clear existing users
    await db.collection('users').deleteMany({});
    
    // Hash passwords
    const bcrypt = require('bcryptjs');
    
    const users = [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@moxvoyage.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'admin',
        emailVerified: true,
        isActive: true,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Manager',
        lastName: 'User',
        email: 'manager@moxvoyage.com',
        password: await bcrypt.hash('manager123', 12),
        role: 'manager',
        emailVerified: true,
        isActive: true,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('client123', 12),
        role: 'client',
        emailVerified: true,
        isActive: true,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('client123', 12),
        role: 'client',
        emailVerified: true,
        isActive: true,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    const result = await db.collection('users').insertMany(users);
    console.log(`✅ Seeded ${result.insertedCount} users`);
    
    // Display created users
    console.log('\n📋 Created users:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.role})`);
      if (user.role === 'admin') console.log('   Password: admin123');
      if (user.role === 'manager') console.log('   Password: manager123');
      if (user.role === 'client') console.log('   Password: client123');
    });
    
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await client.close();
  }
}

seedUsers().catch(console.error);
