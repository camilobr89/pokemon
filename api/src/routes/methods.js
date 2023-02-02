const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            hp: el.stats[0].base_stat,
            attack: el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[5].base_stat,
            height: el.height,
            weight: el.weight,
            type: el.types.map(el => el.type.name),
            img: el.sprites.other.dream_world.front_default

        };
    });

    return apiInfo;

};

const getDbInfo = async () => {
    return await Pokemon.findAll({
        incluide: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],                    
            }
        }
    });
};

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports = { getAllPokemons };