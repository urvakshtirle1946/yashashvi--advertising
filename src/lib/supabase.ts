import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Returns the public URL for a file in the gallery bucket.
 */
export function getGalleryUrl(filename: string): string {
  const { data } = supabase.storage.from('gallery').getPublicUrl(filename)
  return data.publicUrl
}
