import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs)
const client = generateClient<Schema>();

export async function GET() {
  try {
    const result = await client.queries.helloAmplify();
    return Response.json({ message: result });
  } catch (error) {
    return Response.json({ error: "Error calling helloAmplify" }, { status: 500 });
  }
}