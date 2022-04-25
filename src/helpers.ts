import { TypeObject } from "@mui/material/styles/createPalette";
import { type } from "os";
import { Type } from "./interfaces";

/**
 * Pokemon type matrix from https://img.pokemondb.net/images/typechart.png
 * Row is attacker
 * Column is Defender
 */
export const typeMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
];

export const typeObject: { [key: string]: number } = {
  normal: 0,
  fire: 1,
  water: 2,
  electric: 3,
  grass: 4,
  ice: 5,
  fighting: 6,
  poison: 7,
  ground: 8,
  flying: 9,
  psychic: 10,
  bug: 11,
  rock: 12,
  ghost: 13,
  dragon: 14,
  dark: 15,
  steel: 16,
  fairy: 17,
};

export const pokemonAttackCalculator = (types: Array<Type>) => {
  const typeArrayIndices = [];
  const strongAgainstIndices: number[] = [];
  const strongAgainst: string[] = [];
  const typeName = [];
  for (const type of types) {
    let name = type.type.name;
    typeName.push(name);
    typeArrayIndices.push(typeObject[name]);
  }

  for (let i = 0; i < typeArrayIndices.length; i++) {
    let row = typeArrayIndices[i];
    for (let col = 0; col < typeMatrix.length; col++) {
      if (typeMatrix[row][col] === 2) {
        if (!strongAgainstIndices.includes(col)) {
          strongAgainstIndices.push(col);
        }
      }
    }
  }

  for (const index of strongAgainstIndices) {
    let typeName = Object.keys(typeObject)[index];
    strongAgainst.push(typeName);
  }
  return attackDescription(typeName, strongAgainst);
};

export const attackDescription = (
  curType: string[],
  strongAgainstType: string[]
) => {
  return (
    curType.join(" and ") + " is strong against " + strongAgainstType.join(", ")
  );
};

export const pokemonWeakCalulator = (types: Array<Type>) => {
  const typeArrayIndices = [];
  const weakAgainstIndices: number[] = [];
  const weakAgainst: string[] = [];
  const typeName = [];
  for (const type of types) {
    let name = type.type.name;
    typeName.push(name);
    typeArrayIndices.push(typeObject[name]);
  }

  for (let i = 0; i < typeArrayIndices.length; i++) {
    let row = typeArrayIndices[i];
    for (let col = 0; col < typeMatrix.length; col++) {
      if (typeMatrix[row][col] === 0.5) {
        if (!weakAgainstIndices.includes(col)) {
          weakAgainstIndices.push(col);
        }
      }
    }
  }

  for (const index of weakAgainstIndices) {
    let typeName = Object.keys(typeObject)[index];
    weakAgainst.push(typeName);
  }
  return weakDescription(typeName, weakAgainst);
};

export const weakDescription = (
  curType: string[],
  strongAgainstType: string[]
) => {
  return (
    curType.join(" and ") + " is weak against " + strongAgainstType.join(", ")
  );
};
