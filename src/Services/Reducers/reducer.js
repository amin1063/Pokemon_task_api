// import { ADD_TO_CART } from '../constants'
const initialState = {
    pokemonData: [],
    pokemonTypes: [],
    pokemonDetails:[],
    pokemonTypesById : []

}
export default function cardItems(state = initialState, action) {
    switch (action.type) {
        case "POKEMON_FETCH_SUCCESS":
            return {
                ...state,
                pokemonData : action.payload
            }
        case "TYPESID_FETCH_SUCCESS":
            return {
                ...state,
                pokemonTypesById : action.payload
            }
        case "TYPES_FETCH_SUCCESS":
            return {
                ...state,
                pokemonTypes : action.payload
            }
        case "DETAILS_FETCH_SUCCESS":
            return {
                ...state,
                pokemonDetails : action.payload
            }
            // break;
        default:
            return state
    }


}