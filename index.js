

const express = require('express');
const app = express();
const fs = require('fs'); // Dosya işlemleri için 'fs' modülünü ekliyoruz

const dataPath = './countries.json'; // JSON dosyasının yolu

const cors = require('cors');
app.use(cors());

const data = Object.values(JSON.parse(fs.readFileSync(dataPath)));

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Bu alan adına izin verilmiyor'));
    }
  },
}));



// // JSON dosyasını oku
// fs.readFile(dataPath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Hata:', err);
//     return;
//   }

//   try {
//     const jsonData = JSON.parse(data);

//     // Yeni verileri saklayacağımız bir dizi oluştur
//     const newData = [];

//     // Her eleman için işlem yap
//     for (const key in jsonData) {
//       if (jsonData.hasOwnProperty(key)) {
//         const value = jsonData[key];
//         value.id = key;
//         value.flag = `http://aedemirsen.bilgimeclisi.com/country_flags/${key.toLowerCase()}.svg`;
//         newData.push(value);
//       }
//     }

//     // Yeni JSON dosyasına yaz
//     fs.writeFile('output.json', JSON.stringify(newData, null, 4), 'utf8', (err) => {
//       if (err) {
//         console.error('Hata:', err);
//         return;
//       }
//       console.log('İşlem tamamlandı. Yeni veri "output.json" dosyasına yazıldı.');
//     });
//   } catch (parseError) {
//     console.error('JSON ayrıştırma hatası:', parseError);
//   }
// });




// getAllCountries metodunu tanımla
app.get('/getAllCountries', (req, res) => {
    const countries = data;
    res.json(countries);
});

// getCountryByName metodunu tanımla
app.get('/getCountryByName/:name', (req, res) => {
    const name = req.params.name;
    const countries = data;
    const country = countries.find(country => country.name === name);
    res.json(country);
});

// getCountryById metodunu tanımla
app.get('/getCountryById/:id', (req, res) => {
    const id = req.params.id;
    const countries = data;
    const country = countries.find(country => country.id === id);
    res.json(country);
});

// getAllCountriesBySort metodunu tanımla
app.get('/getAllCountriesBySort/:sort', (req, res) => {
    const sort = req.params.sort;
    const countries = data;

    if (sort === 'asc') {
        countries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'desc') {
        countries.sort((a, b) => b.name.localeCompare(a.name));
    }

    res.json(countries);
});

// getCountriesByContinent metodunu tanımla
app.get('/getCountriesByContinent/:continent', (req, res) => {
    const continent = req.params.continent;
    const countries = data.filter(country => country.continent === continent);
    res.json(countries);
});

// Web servis portunu belirt
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Web servis çalışıyor. Port: ${PORT}`);
});
