const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {getInfoApi , getInfoDbApi , getInfoDb} = require("./controllers");
const { Videogame, Genres, Platform} = require('../db')
const platformRouter = Router();
const {API_KEY} = process.env ; 

//-------------------------------------- GET PLATAFORM---------------------------------------------
platformRouter.get('/platforms', async (req, res)=> {
    const api = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    const apiPlatf = await api.data.results?.map(e => e.name)
    apiPlatf.forEach( e => {
        Platform.findOrCreate({
            where : {
                name: e
            }
        })
    });
    const allPlatf = await Platform.findAll();
    res.status(200).send(allPlatf)
})

module.exports = platformRouter;

