
export const getPokemonList =(data)=>{
    return {
        type:"POKEMON_FETCH_SUCCESS",
        payload:data
    }
}
export const getPokemonTypes =(data)=>{
    return {
        type:"TYPES_FETCH_SUCCESS",
        payload:data
    }
}
export const getPokemonTypesById =(data)=>{
    return {
        type:"TYPESID_FETCH_SUCCESS",
        payload:data
    }
}
export const getPokemonDetails =(data)=>{
    return {
        type:"DETAILS_FETCH_SUCCESS",
        payload:data
    }
}
