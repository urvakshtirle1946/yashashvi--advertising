/**
 * Run: node scripts/download-logos.mjs
 * Downloads brand logos into public/brands/
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'brands')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

// Verified direct Wikimedia CDN URLs + reliable fallbacks
const brands = [
  { file: 'mp-birla',    urls: ['https://upload.wikimedia.org/wikipedia/en/3/3f/M.P_Birla_Group_logo.jpg'] },
  { file: 'probus',      urls: ['https://upload.wikimedia.org/wikipedia/en/0/0f/Probus_insurance_logo.png', 'https://www.probusinsurance.com/favicon.ico'] },
  { file: 'johnson',     urls: ['https://upload.wikimedia.org/wikipedia/commons/b/b9/Johnson_Tiles_logo.png', 'https://www.johnsontiles.com/favicon.ico'] },
  { file: 'ceat',        urls: ['https://upload.wikimedia.org/wikipedia/commons/6/6a/CEAT_logo.svg'] },
  { file: 'bata',        urls: ['https://upload.wikimedia.org/wikipedia/commons/7/77/Bata_logo.svg'] },
  { file: 'ogeneral',    urls: ['https://upload.wikimedia.org/wikipedia/commons/8/87/O-general-logo.png', 'https://www.general.co.in/favicon.ico'] },
  { file: 'havells',     urls: ['https://upload.wikimedia.org/wikipedia/commons/4/4f/Havells_logo.svg', 'https://upload.wikimedia.org/wikipedia/en/4/4f/Havells_logo.svg'] },
  { file: 'ultratech',   urls: ['https://upload.wikimedia.org/wikipedia/commons/6/65/UltraTech_Cement.svg'] },
  { file: 'ambuja',      urls: ['https://upload.wikimedia.org/wikipedia/commons/f/f2/Ambuja_Cements_Logo.svg', 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ambuja_Cements.png'] },
  { file: 'nuvoco',      urls: ['https://upload.wikimedia.org/wikipedia/commons/3/3d/Nuvoco_logo.png', 'https://www.nuvoco.com/favicon.ico'] },
  { file: 'elica',       urls: ['https://upload.wikimedia.org/wikipedia/en/8/8c/Elica_logo.png'] },
  { file: 'faber',       urls: ['https://upload.wikimedia.org/wikipedia/commons/f/f9/Faber_logo.svg', 'https://www.faberindia.com/favicon.ico'] },
  { file: 'eastman',     urls: ['https://upload.wikimedia.org/wikipedia/commons/1/16/Eastman_Chemical_Company_logo.svg'] },
  { file: 'baidyanath',  urls: ['https://upload.wikimedia.org/wikipedia/commons/7/77/New_Baidyanath_Logo-01.png'] },
  { file: 'ifb',         urls: ['https://upload.wikimedia.org/wikipedia/commons/4/49/IFB.png'] },
  { file: 'peter-england', urls: ['https://upload.wikimedia.org/wikipedia/commons/d/d8/Peter_England_logo.svg', 'https://upload.wikimedia.org/wikipedia/en/5/55/Peter_England_Logo.png'] },
  { file: 'tbz',         urls: ['https://upload.wikimedia.org/wikipedia/commons/e/e7/TBZ_logo.png', 'https://www.tbztheoriginal.com/favicon.ico'] },
  { file: 'skf',         urls: ['https://upload.wikimedia.org/wikipedia/commons/1/11/SKF_logo.svg'] },
  { file: 'skechers',    urls: ['https://upload.wikimedia.org/wikipedia/commons/c/c2/Skechers_wordmark.svg'] },
  { file: 'paytm',       urls: ['https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg'] },
  { file: 'nippon',      urls: ['https://upload.wikimedia.org/wikipedia/en/2/28/Nippon_India_Mutual_Fund_logo.png', 'https://www.nipponindiamf.com/favicon.ico'] },
  { file: 'hdfc-life',   urls: ['https://upload.wikimedia.org/wikipedia/commons/f/fc/HDFC_Life_logo.svg', 'https://upload.wikimedia.org/wikipedia/en/7/78/HDFC_Life_Insurance_logo.png'] },
  { file: 'rbl-bank',    urls: ['https://upload.wikimedia.org/wikipedia/commons/a/a4/RBL_Bank_logo.svg', 'https://upload.wikimedia.org/wikipedia/en/e/e7/RBL_Bank.png'] },
  { file: 'duroflex',    urls: ['https://upload.wikimedia.org/wikipedia/commons/d/d5/Duroflex_Logo.png', 'https://www.duroflex.com/favicon.ico'] },
  { file: 'oap',         urls: ['https://www.oap.in/favicon.ico'] },
  { file: 'moms',        urls: ['https://www.momsoutdoor.com/favicon.ico'] },
  { file: 'kinetic',     urls: ['https://upload.wikimedia.org/wikipedia/commons/2/2c/Kinetic_Engineering_Limited.svg'] },
]

function download(url, dest) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/svg+xml,image/png,image/*,*/*',
        'Referer': 'https://en.wikipedia.org/',
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        if (res.headers.location) {
          download(res.headers.location, dest).then(resolve)
        } else resolve(false)
        return
      }
      if (res.statusCode !== 200) { resolve(false); return }
      const ct = res.headers['content-type'] || ''
      const ext = ct.includes('svg') ? '.svg'
        : ct.includes('png') ? '.png'
        : ct.includes('jpeg') || ct.includes('jpg') ? '.jpg'
        : ct.includes('webp') ? '.webp'
        : ct.includes('ico') ? '.ico'
        : url.endsWith('.svg') ? '.svg'
        : url.endsWith('.png') ? '.png'
        : url.endsWith('.jpg') || url.endsWith('.jpeg') ? '.jpg'
        : ''
      if (!ext) { resolve(false); return }
      const file = fs.createWriteStream(dest + ext)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve(dest + ext) })
      file.on('error', () => resolve(false))
    })
    req.on('error', () => resolve(false))
    req.setTimeout(10000, () => { req.destroy(); resolve(false) })
  })
}

async function main() {
  console.log('\n🚀 Downloading brand logos...\n')
  const manifest = {}

  // Load existing manifest if present
  const manifestPath = path.join(__dirname, '..', 'src', 'lib', 'brand-logos.json')
  if (fs.existsSync(manifestPath)) {
    Object.assign(manifest, JSON.parse(fs.readFileSync(manifestPath, 'utf8')))
  }

  for (const brand of brands) {
    // Skip if already downloaded
    const exts = ['.svg', '.png', '.jpg', '.webp', '.ico']
    const existing = exts.find(e => fs.existsSync(path.join(OUT, brand.file + e)))
    if (existing) {
      console.log(`⏭️  ${brand.file} already exists`)
      manifest[brand.file] = '/brands/' + brand.file + existing
      continue
    }

    let saved = false
    for (const url of brand.urls) {
      const result = await download(url, path.join(OUT, brand.file))
      if (result) {
        const rel = '/brands/' + path.basename(result)
        manifest[brand.file] = rel
        console.log(`✅ ${brand.file} → ${rel}`)
        saved = true
        break
      }
    }
    if (!saved) console.log(`⚠️  ${brand.file} — all sources failed, will use monogram`)
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  const count = Object.keys(manifest).length
  console.log(`\n✨ Done! ${count}/${brands.length} logos downloaded → src/lib/brand-logos.json\n`)
}

main().catch(console.error)
