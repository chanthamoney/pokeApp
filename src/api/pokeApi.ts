import axios from "axios";
import { pokeDexDescription } from "../utils";

export async function getPokemon(pokemon: String) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pokeInfo = res.data;
    const pokemonCardInfo = {
      types: pokeInfo.types,
      sprites: pokeInfo.sprites,
      id: pokeInfo.id,
    };
    return pokemonCardInfo;
  } catch (err) {
    throw err;
  }
}

export async function getPokemonSpecies(pokemon: String) {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
    );
    const speciesInfo = res.data.flavor_text_entries;
    return pokeDexDescription(speciesInfo);
  } catch (err) {
    throw err;
  }
}
