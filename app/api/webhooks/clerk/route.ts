import { Webhook } from "svix";
import { headers } from "next/headers";
import User from "@/model/User"
import connectDb from "@/lib/mongoDb";
export async function POST(req:any) {
  await connectDb();

  const payload = await req.text();
  const header:any = headers();
  const svix_id = header.get("svix-id");
  const svix_timestamp = header.get("svix-timestamp");
  const svix_signature = header.get("svix-signature");

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET as string);

  let evt:any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;

  // Check if user exists
  const existingUser = await User.findOne({ clerkId: id });
  console.log(existingUser , "this is exit user")
  if (!existingUser) {
  const res =  await User.create({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
    });
    console.log(res)
  }

  return new Response("OK", { status: 200 });
}
