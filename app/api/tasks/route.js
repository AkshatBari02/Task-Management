import { connectToDB } from "@utils/database";
import Task from "@models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDB();
  const tasks = await Task.find({ userId: session?.user.id }).sort({
    createdAt: -1,
  });
  console.log(tasks);
  return NextResponse.json(tasks);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDB();
  if (!session.user?.id) {
    return NextResponse.json(
      { error: "User ID not found in session" },
      { status: 400 }
    );
  }
  const { title, description } = await req.json();
  try {
    const newTask = await Task.create({
      userId: session.user.id,
      title,
      description,
    });
    console.log("New task:", newTask);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDB();
  const { id, ...updates } = await req.json();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    updates,
    { new: true }
  );
  return NextResponse.json(updatedTask);
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDB();
  const { id } = await req.json();
  await Task.findOneAndDelete({ _id: id, userId: session.user.id });
  return NextResponse.json({ message: "Task deleted" });
}
