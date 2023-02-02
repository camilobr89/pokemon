const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db.js');
const router = Router();

router.get("/", async(req, res) => {
    try{
        const typeApi = await axios(`https://pokeapi.co/api/v2/type`);
        const type = typeApi.data.map(el => el.type).join(', ').split(', ').filter(el => el !="");

        type.forEach(el => {
            Type.findOrCreate({
                where: { name: el }
            });
        });

            const pokemonType = await Type.findAll();
            res.send(pokemonType);

    } catch(error) {
        res.status(404).send(`No se encontró ningún tipo de pokemon`);
    }
});

module.exports = router;