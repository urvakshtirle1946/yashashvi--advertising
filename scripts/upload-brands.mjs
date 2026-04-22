/**
 * Upload brand logos to Supabase Storage
 * Run: $env:SUPABASE_SERVICE_KEY="your-service-role-key"; node scripts/upload-brands.mjs
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = 'https://oyjhphtepgrvrbytbais.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE'
const BUCKET      = 'brands'
const BRANDS_DIR  = path.join(__dirname, '..', 'public', 'brands')

if (SUPABASE_KEY === 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE') {
  console.error('\n❌ Set your service role key first:\n')
  console.error('   $env:SUPABASE_SERVICE_KEY="your-key"; node scripts/upload-brands.mjs\n')
  console.error('   Get it from: Supabase Dashboard → Settings → API → service_role\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const mimeTypes = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
}

async function checkBucket() {
  const { error } = await supabase.storage.from(BUCKET).list('', { limit: 1 })
  if (error) {
    console.error(`\n❌ Bucket "${BUCKET}" not accessible.`)
    console.error('   Go to Supabase Dashboard → Storage → New bucket')
    console.error(`   Name: ${BUCKET} | Public: ON\n`)
    process.exit(1)
  }
  console.log(`📦 Bucket "${BUCKET}" ready`)
}

async function uploadFile(filename) {
  const filePath  = path.join(BRANDS_DIR, filename)
  const ext       = path.extname(filename).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  const buffer    = fs.readFileSync(filePath)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType, upsert: true })

  if (error) {
    console.error(`❌ ${filename} — ${error.message}`)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  console.log(`✅ ${filename}`)
  return { filename, url: data.publicUrl }
}

async function main() {
  console.log('\n🚀 Uploading brand logos to Supabase Storage...\n')
  await checkBucket()

  const files = fs.readdirSync(BRANDS_DIR).filter(f =>
    Object.keys(mimeTypes).includes(path.extname(f).toLowerCase())
  )

  console.log(`\n📁 Found ${files.length} files\n`)

  const results = []
  for (const file of files) {
    const result = await uploadFile(file)
    if (result) results.push(result)
  }

  // Write URL map so component can import it
  const urlMap = {}
  results.forEach(r => { urlMap[r.filename] = r.url })

  const outPath = path.join(__dirname, '..', 'src', 'lib', 'brand-supabase-urls.json')
  fs.writeFileSync(outPath, JSON.stringify(urlMap, null, 2))

  console.log(`\n✨ ${results.length}/${files.length} logos uploaded!`)
  console.log(`📄 URL map → src/lib/brand-supabase-urls.json\n`)
}

main().catch(console.error)
