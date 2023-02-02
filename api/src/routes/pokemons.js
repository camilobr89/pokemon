const { Router } =  require ( 'express' );
const { Pokemon, Type } =  require ( '../db.js' );
const router = Router();
const {  getAllPokemons  } =  require ( './methods.js' );

router.get("/", async(req, res, next) => {
    
    try{
        const { name } = req.query;
        let totalPokemons = await getAllPokemons();

        if (name) {
            let pokemonName = await totalPokemons.filter(el => el.name.toUpperCase().includes(name.toUpperCase()))
            pokemonName.length ?
            res.status(200).send(pokemonName) :
            res.status(404).send(`No se encontró ningún pokemon con el nombre ${name}`);
        }

        else {
            res.status(200).json(totalPokemons ? totalPokemons : `No se encontraron pokemons`);
        }
            
        
    }  catch (error) {
        console.log(error);
    }
        
    });

    router.get("/:id", async(req, res) => {
        try{
            const { id } = req.params;
            const totalPokemons = await getAllPokemons();
            
            if (id) {
                let pokemonId = await totalPokemons.filter(el => el.id == id);
                pokemonId.length ?
                res.status(200).send(pokemonId) :
                res.status(404).send(`No se encontró ningún pokemon con el id ${id}`);
            }
        } catch (error) {
            console.log(error);
            res.status(404).send(`No se encontró ningún pokemon con el id ${id}`);
        }
    });

    router.post("/", async(req, res) => {
        let { name, hp, attack, defense, speed, height, weight, type, img, createdInDataBase } = req.body;

        try {
            let postPokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                createdInDataBase
            });

            let typeDb = await Type.findAll({
                where: {name: type}
            });

            postPokemon.addType(typeDb);
            res.send(`Pokemon creado con éxito`);
        } catch (error) {
            console.log(error);
            res.status(404).send(`No se pudo crear el pokemon`);
        }
    });

module.exports = router;