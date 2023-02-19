import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();
import axios from "axios";

const getPokemonList = async () => {
  try {
    const response = await P.getPokemonsList();
    return response.results;
  } catch (error) {
    console.log("There was an ERROR during getPokemonList: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

const getPokemonData = async (pokemon) => {
  try {
    const response = await P.getResource(pokemon.url);
    return response;
  } catch (error) {
    console.log("There was an ERROR during getPokemonData: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

const getPokedexEntry = async (data) => {
  try {
    const response = await axios.get(data.species.url, { timeout: 30000 });
    const entry = response.data.id;
    return entry;
  } catch (error) {
    console.log("There was an ERROR during getPokedexEntry: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

const getPokemonFrenchName = async (data) => {
  try {
    const response = await axios.get(data.species.url, { timeout: 30000 });
    return response.data.names.find((name) => name.language.name === "fr").name;
  } catch (error) {
    console.log("There was an ERROR during getPokemonFrenchName: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

const buildPokemon = async (pokemon) => {
  try {
    const data = await getPokemonData(pokemon);
    const name = data.name;
    const id = data.id;
    const miniSprite = data.sprites.front_default;
    const largeSprite = data.sprites.other["official-artwork"].front_default;
    const types = data.types.map((type) => type.type.name);
    const abilities = data.abilities.map((ability) => ability.ability.name);
    const [pokedexEntry, frenchName] = await Promise.all([
      getPokedexEntry(data),
      getPokemonFrenchName(data),
    ]);
    const stats = {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    };
    const finalPokemon = {
      name,
      frenchName,
      id,
      pokedexEntry,
      miniSprite,
      largeSprite,
      types,
      abilities,
      stats,
    };
    console.log(finalPokemon);
    return finalPokemon;
  } catch (error) {
    console.log("There was an ERROR during buildPokemon: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

const buildPokedex = async () => {
  try {
    const pokemonList = await getPokemonList();
    const pokedex = await Promise.all(
      pokemonList.map((pokemon) => buildPokemon(pokemon))
    );
    console.log(pokedex);
    return pokedex;
  } catch (error) {
    console.log("There was an ERROR during buildPokedex: ", error);
    throw error; // re-throw the error so that the calling code can handle it
  }
};

export {
  getPokemonList,
  getPokemonData,
  getPokemonFrenchName,
  buildPokemon,
  getPokedexEntry,
  buildPokedex,
};
