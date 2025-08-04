const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/velukuilubin";

async function updatePassword() {
  await mongoose.connect(MONGODB_URI);

  const hashedPassword = await bcrypt.hash("Lubin147852369lub", 10);

  await mongoose.connection.db
    .collection("users")
    .updateOne(
      { email: "admin@example.com" },
      { $set: { password: hashedPassword } }
    );

  console.log("🔒 Пароль оновлено з хешем");
  mongoose.disconnect();
}

updatePassword();
