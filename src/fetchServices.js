import { getPokemonDetails, getPokemonList, getPokemonTypes, getPokemonTypesById } from "./Services/Actions/action";
import { baseUrl } from "./config";

export const fetchData = async (dispatch,offset) => {
    try {
        const response = await fetch(`${baseUrl}/pokemon?limit=16&offset=${offset}`);
        const result = await response.json();
        dispatch(getPokemonList(result?.results));
    } catch (error) {
        console.log("error", error);
    } 
};

export const fetchType = async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/type/`);
        const result = await response.json();
        dispatch(getPokemonTypes(result?.results));
    } catch (error) {
        console.log("error", error);
    } 
};
export const fetchTypeById = async (dispatch,id) => {
    try {
        const response = await fetch(`${baseUrl}/type/${id}`);
        const result = await response.json();
        dispatch(getPokemonTypesById(result?.pokemon));
    } catch (error) {
        console.log("error", error);
    } 
};

export const fetchDetails = async (dispatch,cardId) => {
    try {
        const response = await fetch(`${baseUrl}/pokemon/${cardId}`);
        const result = await response.json();
        return result;
        // dispatch(getPokemonDetails(result));
    } catch (error) {
        console.log("error", error);
    } 
};


export const fetchSingleData = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const result = await response.json();
    } catch (error) {
        console.log("error", error);
        // setError(error);
    }
};
