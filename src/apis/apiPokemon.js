import axios from "axios";
import { API_URL } from "@/components/rutas"; // Ajusta la ruta según tu estructura de archivos
import { AsyncCompiler } from "sass";

const apiPokemon = axios.create({
  baseURL: API_URL,
});

export default apiPokemon;

export const getAllPokemonData = async () => {
  try {
    // Obtener todos los Pokémon
    const response = await apiPokemon.get(`pokemon?limit=1172&offset=0`);
    const allPokemon = response.data.results;

    // Mapear y obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      allPokemon.map(async (pokemon) => {
        const details = await getPokemonData(pokemon.url);
        return details;
      })
    );

    return pokemonDetails;
  } catch (err) {
    console.log(`|||Se detectó un error|| ${err}`);
    throw err;
  }
};

const getPokemonData = async (url) => {
  try {
    const response = await axios.get(url);
    const pokemon = response.data;

    return {
      id: pokemon.id,
      nombre: pokemon.name,
      peso: pokemon.weight,
      altura: pokemon.height,
      habilidad1: pokemon.abilities?.[0]?.ability?.name || "",
      habilidad2: pokemon.abilities?.[1]?.ability?.name || "",

      generacion: pokemon,
      stats: {
        hp: pokemon.stats[0]?.base_stat,
        ataque: pokemon.stats[1]?.base_stat,
        defensa: pokemon.stats[2]?.base_stat,
        ataqueSp: pokemon.stats[3]?.base_stat,
        defensaSp: pokemon.stats[4]?.base_stat,
        velocidad: pokemon.stats[5]?.base_stat,
      },


      imagenes: {
        img: pokemon.sprites.front_default,
        imgAdicional: pokemon.sprites.front_shiny,
      },


      tipos: {
        tipo1:  pokemon.types[0]?.type?.name || 'N/A',
        tipo2:  pokemon.types[1]?.type?.name || 'N/A',

      }
    };
  } catch (err) {
    console.log(
      `|||Se detectó un error al obtener los datos del Pokémon|| ${err}`
    );
    throw err;
  }
};


// tipos
export const getTypePokemon = async () =>{
  const response = await apiPokemon.get(`pokemon?limit=1172&offset=0`)
  const allPokemon = response.data.results;
  const pokemonDetails = await Promise.all(
    allPokemon.map(async (pokemon) => {
      const details = await getPokemonType(pokemon.url);
      return details;
    })
  );
  return pokemonDetails;
}

const getPokemonType = async (url) => {
  try {
    const response = await axios.get(url);
    const pokemon = response.data;

    return {
      
      nombre: pokemon.name,

      tipos: {
        tipo1:  pokemon.types[0]?.type?.name || 'N/A',
        tipo2:  pokemon.types[1]?.type?.name || 'N/A',
      },

      imagenes: {
        img: pokemon.sprites.front_default,
        imgAdicional: pokemon.sprites.front_shiny,
      },
    };
  } catch (err) {
    console.log(
      `|||Se detectó un error al obtener los datos del Pokémon|| ${err}`
    );
    throw err;
  }
};