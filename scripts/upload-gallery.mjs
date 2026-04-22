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
const SUPABASE_KEY = 'sb_publishable_-4rDAn6jf9MICYQuF8JiXA__krGkeNj'
const BUCKET     = 'gallery'
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'gallery')
// ──────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const mimeTypes = {
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.mov':  'video/quicktime',
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some(b => b.name === BUCKET)
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
    if (error) throw new Error(`Failed to create bucket: ${error.message}`)
    console.log(`✅ Created bucket "${BUCKET}"`)
  } else {
    console.log(`📦 Bucket "${BUCKET}" already exists`)
  }
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

  await ensureBucket()

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
