import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzqqgurlqunpzgdavedz.supabase.co';
const supabaseAnonKey = 'sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
