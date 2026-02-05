
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://obsuogkzzqzggqlnpalu.supabase.co'
const supabaseKey = 'sb_publishable_YdOq5GwDxdzBPbb_o1Tezg_9-qLlzy5'

export const supabase = createClient(supabaseUrl, supabaseKey)
