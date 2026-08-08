import { connectDB } from "../lib/db.js";
import User from "../models/User.js";

const makeAdmin = async () => {
  const email = process.argv[2];

  if (!email) {
    console.error("❌ Please provide an email address.");
    console.log("Usage: npm run make:admin user@example.com");
    process.exit(1);
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.error(`❌ No user found with email '${email}'. Please register the account first.`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();

    console.log(`🎉 Success! User '${user.name}' (${user.email}) is now an ADMIN.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating user role:", error.message);
    process.exit(1);
  }
};

makeAdmin();
