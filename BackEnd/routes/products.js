const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const getGoldPrice = require('../utils/goldPriceFetcher');

router.get('/', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, '..', 'data', 'products.json');
    const productsRaw = fs.readFileSync(productsPath);
    const products = JSON.parse(productsRaw);

    const goldPrice = await getGoldPrice(); // USD/gram
    console.log(` Gold price used for calculation: $${goldPrice} USD/gram`);

    let enrichedProducts = products.map(product => {
      const calculatedPrice = (product.popularityScore + 1) * product.weight * goldPrice;
      const price = parseFloat(calculatedPrice.toFixed(2));
      const popularityOutOfFive = (product.popularityScore * 5).toFixed(1);
      
      console.log(` ${product.name}: (${product.popularityScore} + 1) * ${product.weight}g * $${goldPrice} = $${price}`);
      
      return {
        ...product,
        price,
        goldPrice,
        weight: product.weight,
        popularityScore: product.popularityScore,
        popularity: parseFloat(popularityOutOfFive),
        popularityLabel: `${popularityOutOfFive}/5`
      };
    });

    // 🆕 Sıralama işlemi burada
    const sortBy = req.query.sort;

    if (sortBy === 'price') {
      enrichedProducts.sort((a, b) => a.price - b.price); 
      console.log('Sorted by price (ascending)');
    } else if (sortBy === 'popularity') {
      enrichedProducts.sort((a, b) => b.popularityScore - a.popularityScore); 
      console.log(' Sorted by popularity (descending)');
    }

    res.json(enrichedProducts);
  } catch (error) {
    console.error(' Error in products route:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;


