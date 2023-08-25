
import { Notes } from "./components/Notes"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export const revalidate = 0
export default async function Home() {

  const {data, error} = await supabase
    .from("Notes").select()

  console.log('Notes', data)

  return (
    <main className="flex flex-col items-center p-24">
        <Notes data={data}/>
    </main>
  )
}
