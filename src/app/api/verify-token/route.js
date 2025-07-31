import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, SECRET);
    return NextResponse.json({ valid: true, user: decoded });
  } catch (err) {
    return NextResponse.json(
      { valid: false, error: "Invalid token" },
      { status: 401 }
    );
  }
}
