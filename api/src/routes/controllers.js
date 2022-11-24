const axios = require("axios");
const { Videogame, Genres, Platform} = require('../db')
const {API_KEY} = process.env




 const getInfoDb = async () => {
        const dbData = await Videogame.findAll({
          include: {
            model: Genres,
            attribute: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        return dbData;
      };
    
const getInfoApi = async () => {
   const oneHundredGames = [] ; 
   for (let i = 1; i <= 5; i++) {
    let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    api.data.results?.map(e => {
        oneHundredGames.push( {
            id : e.id,
            name: e.name,
            img: e.background_image,
            genres: e.genres?.map(e => e.name).join(', '),
            released: e.released,
            rating: e.rating,
            platform: e.platforms?.map((e) => e.platform.name).join(', ')
        })
    })
};
return oneHundredGames;
};


 const getInfoDbApi = async () =>{
        const apiInfo = await getInfoApi();
        const dbInfo = await getInfoDb();
        const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
};

module.exports = {
    getInfoApi,
    getInfoDb,
    getInfoDbApi
};