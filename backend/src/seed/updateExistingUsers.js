import { connectDB } from "../lib/db.js";
import User from "../models/User.js";

const updateUsers = async () => {
  try {
    console.log("🔄 Connecting to MongoDB to update existing users...");
    await connectDB();

    // Find users missing the 'role' field
    const result = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: "user" } }
    );

    console.log(`✅ MongoDB Update Complete!`);
    console.log(`- Matched documents without role: ${result.matchedCount}`);
    console.log(`- Modified documents: ${result.modifiedCount}`);

    // List current users and their roles
    const users = await User.find().select("name email role isVerified").lean();
    console.log("\n📋 Current Users in Database:");
    users.forEach((u) => {
      console.log(` - ${u.name} (${u.email}) => Role: '${u.role}', Verified: ${u.isVerified}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating users in MongoDB:", error.message);
    process.exit(1);
  }
};

updateUsers();
