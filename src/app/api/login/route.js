import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST(req) {
  await mongooseConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "Користувача не знайдено" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Невірний пароль" }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
    expiresIn: "1d",
  });

  return NextResponse.json({ token });
}
