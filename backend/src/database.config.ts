import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    jwt: process.env.SUPABASE_JWT_SECRET
  }));