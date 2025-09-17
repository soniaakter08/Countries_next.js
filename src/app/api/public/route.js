import { supabase } from "@/lib/supabase/supabase";

export async function GET(request) {
  const { data, error } = await supabase.from("test").select("*");
  if (error) {
    console.log(error);
  }
  return new Response(`${data}`, { status: 200 });
}
