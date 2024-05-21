import axios from axios;

import { API_URL } from '../components/rutas'

const apiPokemon = axios.create({
    baseURL: API_URL
})

export default apiPokemon

export const getPokemonData = async (pokemonId) => {
    try {
        const response = await api.get(`${API_URL}${pokemonId}`);
        const pokemon = response.data;

        return {
            id: pokemon.id,
            peso: pokemon.weight,
            altura: pokemon.height,
            habilidad1: pokemon.abilities
            ? pokemon.abilities[0]?.ability.name
            || ""
            : "",
            habilidad2: pokemon.abilities
              ? pokemon.abilities[1]?.ability.name || ""
              : "",
            img: pokemon.sprites.front_default,
            imgAdicional: pokemon.sprites.front_shiny,
        }


    } catch (err) {
        console.log(`|||Se detectó un error|| ${err}`);
    }
}