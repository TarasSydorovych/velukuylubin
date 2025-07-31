import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    phone,
    deliveryLocation,
    deliveryMethod,
    street,
    building,
    apartment,
    comment,
    peopleCount,
    items,
    total,
  } = body;

  const VIBER_TOKEN = process.env.NEXT_PUBLIC_VIBER_TOKEN;
  const USER_ID = process.env.NEXT_PUBLIC_TEST;

  const address =
    deliveryMethod === "courier"
      ? `\n📍 Адреса: вул. ${street}, буд. ${building}, кв. ${apartment}`
      : "";

  const itemsText = items
    .map((item) => `• ${item.name} — ${item.quantity} шт.`)
    .join("\n");

  const message = `
🛒 НОВЕ ЗАМОВЛЕННЯ
👤 Імʼя: ${name}
📞 Телефон: ${phone}
📦 Локація: ${deliveryLocation}
🚚 Спосіб: ${deliveryMethod === "courier" ? "Курʼєр" : "Самовивіз"}${address}
👥 Персон: ${peopleCount}
💬 Коментар: ${comment || "немає"}
📋 Товари:
${itemsText}
💰 Разом: ${total} грн
  `.trim();

  try {
    const res = await axios.post(
      "https://chatapi.viber.com/pa/send_message",
      {
        receiver: USER_ID,
        min_api_version: 1,
        sender: { name: "Bot" },
        type: "text",
        text: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Viber-Auth-Token": VIBER_TOKEN,
        },
      }
    );

    return NextResponse.json({ success: true, data: res.data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
