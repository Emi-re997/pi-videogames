const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {getInfoApi , getInfoDbApi , getInfoDb} = require("./controllers");
const { Videogame, Genres, Platform} = require('../db')
const videoGRouter = Router();
const {API_KEY} = process.env

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----------------------------------  GET ALL - VIDEOGAMES---------------------------------------
// Esta ruta me traera todos los Video Games . 
videoGRouter.get("/videogames", async (req, res) =>{
    const name = req.query.name ; 
    const allVideogames = await getInfoDbApi(); 
//Si tengo un nombre que me pasan por query
    if(name){
    let videogameName = await allVideogames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
     videogameName.length ? 
    res.status(200).send(videogameName) : res.status(404).send('No se encuentra el videojuego');
}else{
  res.status(200).send(allVideogames)
}
});
 //---------------------------------------- POST ------------------------------------------------
 videoGRouter.post('/videogames', async (req,res) =>{ 
   let {name, description, released, rating, platforms, img, genres} = req.body
   try{
  if (!name || !description || !genres ) {
     return res.status(400).send("Faltan parametros");
  }
  //valido que el nombre del juego no exista
  const findVideogame = await Videogame.findAll({ where: { name: name } });
 if (findVideogame.length != 0) {
      return res.send("El nombre ya esta en uso");
  }

  
  //creo un videogame
  let vgCreate = await Videogame.create({
      name,
      description,
      rating,
      released,
      img,
      platforms: platforms.toString()

  });

  res.status(201).send(vgCreate);
}catch(error){
    res.status(40).send({error : error.message});
}

  //busco el genero en mi Base de datos
  let genreDb = await Genres.findAll({
    where: { name: genres },
  });

  //agrego el genero a mi videogame creado
  vgCreate.addGenre(genreDb);

  res.send("El Videogame fue creado con exito");

})
 
//--------------------------------------GET ID---------------------------------------------------

videoGRouter.get('/videogames/:id', async (req, res) =>{
  const {id} = req.params;
  try{
if(!id.includes('-')){
      let allVideogames = await getInfoDbApi(); // me trae todo
  
      let idGame = await allVideogames.filter(e => e.id === parseInt(id));
  
      if(idGame.length > 0){
          const detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
          const description = detalle.data.description;
          idGame = description;
          res.status(200).send(idGame)
      }
  }else {
      let gameFound = await Videogame.findByPk(id, {
          include: [{
              model: Genres,
              attributes: ['name'],
              through : {
                  attributes: [],
              }
          }]
      })
      var arreglo = []
      arreglo.push(gameFound)

      res.status(200).json(arreglo)
  }
  }catch(error){
      res.status(404).send(error)
  }
});


module.exports = videoGRouter;
