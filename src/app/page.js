
import { Grants } from "./components/Grants"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export const revalidate = 0
export default async function Home() {

  const {data, error} = await supabase
    .from("Grants").select()

  console.log('Notes', data)

  return (
    <main className="flex flex-col items-center p-24">
        <Grants data={data}/>
    </main>
  )
}
