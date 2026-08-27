const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imageList = [
  // Heroes
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80',
    dest: 'public/assets/images/hero/home-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80',
    dest: 'public/assets/images/hero/gis-survey-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1400&q=80',
    dest: 'public/assets/images/hero/solar-energy-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/hero/about-team.jpg'
  },

  // GIS Services
  {
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/gis-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/land-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/property-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/utility-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/household-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/gis/drone-survey.jpg'
  },

  // Solar Services
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/residential-solar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/commercial-solar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545209568-7c1ecba85942?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/industrial-solar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/solar-site-survey.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/solar-epc.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/solar/solar-monitoring.jpg'
  },

  // Projects
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/abc-industries.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545209568-7c1ecba85942?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/maharashtra-textile.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/central-logistics.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/vidarbha-agro.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/seminary-hills-solar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/skyline-tower.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/nagpur-smart-gis.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/midc-cadastral.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/discom-indexing.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/expressway-lidar.jpg'
  },

  // Team
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    dest: 'public/assets/images/team/rajesh-sharma.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    dest: 'public/assets/images/team/amit-deshmukh.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    dest: 'public/assets/images/team/priya-patil.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // handle redirect
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

async function run() {
  console.log(`Starting download of ${imageList.length} high-resolution local assets...`);
  for (const img of imageList) {
    const fullDest = path.join(__dirname, img.dest);
    const dir = path.dirname(fullDest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    try {
      await download(img.url, fullDest);
      console.log(`✓ Downloaded: ${img.dest} (${(fs.statSync(fullDest).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${img.dest}:`, err.message);
    }
  }
  console.log('All local assets processed successfully!');
}

run();
