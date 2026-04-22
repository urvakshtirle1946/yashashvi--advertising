/**
 * upload-gallery.mjs
 * Run once to upload all files from /public/gallery to Supabase Storage.
 *
 * Usage:
 *   node scripts/upload-gallery.mjs
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://oyjhphtepgrvrbytbais.supabase.co'

// ⚠️  Use the SERVICE ROLE key (not the publishable key) — this is server-only
// Get it from: Supabase Dashboard → Settings → API → service_role (secret)
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE'

const BUCKET     = 'gallery'
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'gallery')
// ──────────────────────────────────────────────────────────────────────────────

if (SUPABASE_KEY === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
  console.error('\n❌ Please set your Supabase service role key!\n')
  console.error('   Option A: Run with env var:')
  console.error('   $env:SUPABASE_SERVICE_KEY="your-key"; node scripts/upload-gallery.mjs\n')
  console.error('   Option B: Paste the key directly on line 18 of upload-gallery.mjs\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


const mimeTypes = {
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.mov':  'video/quicktime',
}

async function checkBucket() {
  const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 1 })
  if (error) {
    throw new Error(
      `❌ Cannot access bucket "${BUCKET}".\n` +
      `   Please create it manually in Supabase Dashboard → Storage → New Bucket\n` +
      `   Name: gallery | Public: ON\n` +
      `   Error: ${error.message}`
    )
  }
  console.log(`📦 Bucket "${BUCKET}" found and accessible`)
}

async function uploadFile(filename) {
  const filePath = path.join(GALLERY_DIR, filename)
  const ext = path.extname(filename).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  const fileBuffer = fs.readFileSync(filePath)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, fileBuffer, {
      contentType,
      upsert: true, // overwrite if already uploaded
    })

  if (error) {
    console.error(`❌ Failed: ${filename} — ${error.message}`)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  console.log(`✅ Uploaded: ${filename}`)
  return data.publicUrl
}

async function main() {
  console.log('\n🚀 Starting gallery upload to Supabase Storage...\n')

  await checkBucket()

  const files = fs.readdirSync(GALLERY_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase()
    return Object.keys(mimeTypes).includes(ext)
  })

  console.log(`\n📁 Found ${files.length} files to upload\n`)

  const results = []
  for (const file of files) {
    const url = await uploadFile(file)
    if (url) results.push({ file, url })
  }

  console.log(`\n✨ Done! ${results.length}/${files.length} files uploaded successfully.\n`)
  console.log('Public URLs:')
  results.forEach(r => console.log(`  ${r.file}\n  → ${r.url}\n`))
}

main().catch(console.error)
