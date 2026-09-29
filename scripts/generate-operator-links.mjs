import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

try {
  const env = readFileSync(".env.local", "utf8");
  env.split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) process.env[k.trim()] = v.join("=").trim();
  });
} catch {}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SECRET      = process.env.OPERATOR_EDIT_SECRET || "ticketmatch-secret";
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || "https://ticketmatch-two.vercel.app";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Variables manquantes");
  process.exit(1);
}

function generateToken(id) {
  return Buffer.from(`${id}:${SECRET}`).toString("base64url");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const targetId = process.argv[2];

async function main() {
  let query = supabase.from("solutions").select("id, name").order("name");
  if (targetId) query = query.eq("id", targetId);
  const { data, error } = await query;
  if (error) { console.error("Erreur:", error.message); process.exit(1); }
  console.log("\n Liens TicketMatch\n" + "-".repeat(80));
  for (const op of data) {
    const token = generateToken(op.id);
    console.log(`\n${op.name} (id: ${op.id})\n   ${SITE_URL}/operateur/${op.id}?token=${token}`);
  }
  console.log("\n" + "-".repeat(80) + `\n${data.length} lien(s) genere(s)\n`);
}

main();
