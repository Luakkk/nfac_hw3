const express = require('express');
const fetchFlipKzArticles = require('./scraper.js');

const app = express();
const URL = 'https://www.flip.kz/catalog';

let parsedArticles = [];
let fetchTime = new Date().toLocaleString();

app.get('/fetch', (req, res) => {
    fetchFlipKzArticles(URL).then(articles => {
        fetchTime = new Date().toLocaleString();
        parsedArticles = articles;
    });
    res.send("Fetching articles...");
});

app.get('/lastfetch', (req, res) => {
    res.send("Last fetch time: " + fetchTime + "\n");
});

app.get('/articles', (req, res) => {
    res.send(parsedArticles);
});

app.get("/", (req, res) => {
    res.send("Health check");
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});
