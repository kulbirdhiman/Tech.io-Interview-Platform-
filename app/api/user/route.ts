
import connectDb from "@/lib/mongoDb";
import User from "@/model/User";

export async function GET() {
  await connectDb();

  const users = await User.find().sort({ createdAt: -1 });

  return new Response(JSON.stringify(users), { status: 200 });
}
