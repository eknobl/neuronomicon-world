import { createClient } from '@supabase/supabase-js';

// Factory — called at request time, not at module load (avoids build-time env var issues)
export function getSupabaseAdmin() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}
