const https = require('https');
https.get('https://nominatim.openstreetmap.org/search.php?q=Kuala+Lumpur&polygon_geojson=1&format=json', {
  headers: { 'User-Agent': 'NodeJS/Trae' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const kl = json.find(j => j.osm_type === 'relation' && j.class === 'boundary');
    if (kl) {
      require('fs').writeFileSync('src/components/home/kl-boundary.json', JSON.stringify(kl.geojson));
      console.log('Saved');
    } else {
      console.log('Not found');
    }
  });
});
