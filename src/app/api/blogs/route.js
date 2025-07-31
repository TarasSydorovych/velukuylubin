import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Blog from "@/models/Blog";

// GET (всі або один)
export async function GET(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog)
        return NextResponse.json(
          { success: false, error: "Блог не знайдено" },
          { status: 404 }
        );
      return NextResponse.json({ success: true, data: blog });
    } else {
      const blogs = await Blog.find();
      return NextResponse.json({ success: true, data: blogs });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Помилка при отриманні блогів" },
      { status: 500 }
    );
  }
}

// POST (створення)
export async function POST(req) {
  await mongooseConnect();
  try {
    const body = await req.json();
    const { ua, photos } = body;

    const blog = new Blog({ ua, photos });
    await blog.save();

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Помилка при створенні" },
      { status: 500 }
    );
  }
}

// PUT (оновлення)
export async function PUT(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const body = await req.json();
    const { ua, photos } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ua, photos },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "Блог не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Помилка при оновленні" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "Блог не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Блог видалено" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Помилка при видаленні" },
      { status: 500 }
    );
  }
}
