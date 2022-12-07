import axios from 'axios';
export const FILTER_BY_REWIEVS = `FILTER_BY_REWIEVS`
export const GET_ALL_GAMES = `GET_ALL_GAMES`
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const GET_GAME_BY_SEARCH = "GET_GAME_BY_SEARCH"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const FILTER_BY_RATING = "FILTER_BY_RATING"
export const FILTER_BY_ABC = "FILTER_BY_ABC"
export const FILTER_CREATED = "FILTER_CREATED"
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAR = "CLEAR"


const { API_URL } = process.env;

export function getAllGames() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/videogames`);
        dispatch({
            type: 'GET_ALL_GAMES',
            payload: json.data
        })
    }
}

export function filterByRewievs() {
    return async function (dispatch) {     
       dispatch({
            type: `FILTER_BY_REWIEVS`,   
        })
    }}


export function getAllGenres() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: 'GET_ALL_GENRES',
            payload: json.data
        })
    }
}

export function getGameBySearch(name) {

    try{
        return{
            type: 'GET_GAME_BY_SEARCH',
            payload: name
            }
        }catch(error){
            console.log(error)
        }
}

    // return async function (dispatch) {
    //     try {
    //         var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    //         return dispatch({
    //             type: 'GET_GAME_BY_SEARCH',
    //             payload: json.data
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload: payload
    }
}

export function filterByRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterByAbc(payload) {
    return {
        type: 'FILTER_BY_ABC',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}
 

export function postGame(payload) {
    return async function () {
        const createPost = await axios.post(`http://localhost:3001/videogame`, payload);
        console.log(createPost);
        return createPost;
    }
}

export function getAllPlatforms(){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/platforms`)
        const platformss = json.data
        return dispatch({
            type: 'GET_ALL_PLATFORMS',
            payload: platformss        
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload : json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function clear(){
    return{
        type: 'CLEAR',
        payload : []
    }
}