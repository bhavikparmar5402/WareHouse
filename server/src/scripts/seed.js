import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Item from '../models/Item.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';
import { initialItems, initialActivities, initialUsers } from '../data/initialData.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    const itemCount = await Item.estimatedDocumentCount();
    if (itemCount === 0) {
      await Item.insertMany(initialItems);
      console.log(`Inserted ${initialItems.length} items`);
    } else {
      console.log('Items collection already populated, skipping item seeding');
    }

    const activityCount = await Activity.estimatedDocumentCount();
    if (activityCount === 0) {
      await Activity.insertMany(initialActivities);
      console.log(`Inserted ${initialActivities.length} activities`);
    } else {
      console.log('Activities collection already populated, skipping activity seeding');
    }

    const userCount = await User.estimatedDocumentCount();
    if (userCount === 0) {
      const users = await initialUsers();
      await User.insertMany(users);
      console.log('Inserted default admin user');
    } else {
      console.log('Users collection already populated, skipping user seeding');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
