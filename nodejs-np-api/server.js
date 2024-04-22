const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

// Маршрут для проксування запитів до Nova Poshta API
app.post('/api/nova-poshta', async (req, res) => {
  const requestBody = req.body;
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  const apiKey = process.env.NOVA_POSHTA_API_KEY;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Обслуговування статичних файлів з папки клієнтської частини
app.use(express.static(path.join(__dirname, 'client')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});