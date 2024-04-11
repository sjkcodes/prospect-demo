import { createClient } from "@supabase/supabase-js";


export async function POST(req) {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
      )
    const data = await req.json()
    const result = await supabase.from("Grants").insert([data])
    console.log(result)
    return Response.json({ message: "This Worked", success: true });
}
