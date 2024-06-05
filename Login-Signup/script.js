const express = require('express');
const router = express.Router();
const axios = require('axios');

const spoonacularApiKey = 'f312e60b13b1443099112b6372a4f535';
const usdaApiKey = 'mHa6Kshhu2i4pvvHBNpI7Vb7VTfBMVpzQTMQlg6g';

router.get('/api/recipes/search', async (req, res) => {
    const query = req.query.query;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${spoonacularApiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.results.map(recipe => ({
            title: recipe.title,
            image: recipe.image,
            id: recipe.id
        })));
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).send('Failed to fetch recipes: ' + error.message);
    }
});

router.get('/api/recipes/:id/information', async (req, res) => {
    const id = req.params.id;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recipe details:', error.message);
        res.status(500).send('Failed to fetch recipe details: ' + error.message);
    }
});

router.get('/api/nutrition', async (req, res) => {
    const ingredient = req.query.ingredient;
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(ingredient)}&api_key=${usdaApiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch nutritional data:', error.message);
        res.status(500).send('Failed to fetch nutritional data: ' + error.message);
    }
}); 

module.exports = router;
