
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchFlipKzArticles(URL) {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const articles = [];

        // Adjust the selectors to match Flip.kz's structure
        $('.product-item').each((index, element) => {
            const title = $(element).find('.item-info a').text().trim();
            const link = $(element).find('.item-info a').attr('href').trim();
            const price = $(element).find('.item-price').text().trim();
            const image = $(element).find('.item-image img').attr('src');

            articles.push({
                title,
                link,
                price,
                image,
            });
        });

        return articles;
    } catch (error) {
        console.error('Error fetching Flip.kz articles:', error);
        return [];
    }
}

module.exports = fetchFlipKzArticles;
