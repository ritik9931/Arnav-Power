const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Reliable direct high-res images from Wikimedia / reliable CDNs
const missingList = [
  {
    // Solar panels on roof / residential
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_edit.jpg/1280px-Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_edit.jpg',
    dest: 'public/assets/images/solar/residential-solar.jpg'
  },
  {
    // Commercial Solar / Rooftop installation
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Solar_Panels_on_Warehouse.jpg/1280px-Solar_Panels_on_Warehouse.jpg',
    dest: 'public/assets/images/solar/commercial-solar.jpg'
  },
  {
    // Industrial Solar Plant / Ground mount
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Solar_panels_on_commercial_building.jpg/1280px-Solar_panels_on_commercial_building.jpg',
    dest: 'public/assets/images/solar/industrial-solar.jpg'
  },
  {
    // Hero Solar
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_edit.jpg/1280px-Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_edit.jpg',
    dest: 'public/assets/images/hero/solar-energy-hero.jpg'
  },
  {
    // Hero Home Composition
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Solar_panels_on_commercial_building.jpg/1280px-Solar_panels_on_commercial_building.jpg',
    dest: 'public/assets/images/hero/home-hero.jpg'
  },
  {
    // Project: ABC Industries
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Solar_panels_on_commercial_building.jpg/1280px-Solar_panels_on_commercial_building.jpg',
    dest: 'public/assets/images/projects/abc-industries.jpg'
  },
  {
    // Project: Maharashtra Textile
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Solar_Panels_on_Warehouse.jpg/1280px-Solar_Panels_on_Warehouse.jpg',
    dest: 'public/assets/images/projects/maharashtra-textile.jpg'
  },
  {
    // Project: Central Logistics
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Solar_Panels_on_Warehouse.jpg/1280px-Solar_Panels_on_Warehouse.jpg',
    dest: 'public/assets/images/projects/central-logistics.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    });

    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fixMissing() {
  for (const item of missingList) {
    const fullDest = path.join(__dirname, item.dest);
    try {
      await download(item.url, fullDest);
      console.log(`✓ Fixed & Downloaded: ${item.dest} (${(fs.statSync(fullDest).size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.log(`Fallback copying for ${item.dest}...`);
      // Fallback: copy from existing verified solar file
      const source = path.join(__dirname, 'public/assets/images/solar/solar-site-survey.jpg');
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, fullDest);
        console.log(`✓ Copied fallback: ${item.dest}`);
      }
    }
  }
}

fixMissing();
