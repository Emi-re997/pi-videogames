const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {getInfoApi , getInfoDbApi , getInfoDb} = require("./controllers");
const { Videogame, Genres, Platform} = require('../db')
const genresRouter = Router();
const {API_KEY} = process.env

//genresRouter.get("/genres", async(req,res)=>{
//    res.send("Estamos en ruta genres")
//});

//--------------------------------------- GET GENRES---------------------------------------------

genresRouter.get('/genres', async (req,res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = await genresApi.data.results.map(e => e.name)
 
    

    genres.forEach(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
        where: {name: e} //
    }))

    const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
    res.json(allGenres)
})

module.exports = genresRouter ;
