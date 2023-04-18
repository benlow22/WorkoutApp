
// import { createClient } from '@supabase/supabase-js';
// import { Database } from 'schema';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// export const user = async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   return user;
// };

// // export const {data: {username}} = await supabase.from('profiles').select('username').match({id: user.id })
// // console.log('USERNAMe:', user.id);
