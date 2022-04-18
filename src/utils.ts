export const stringFormatter = (str: String) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

interface Type {
  slot: string;
  type: {
    name: string;
    url: string;
  };
}

interface flavorText {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export const pokeTypeHandler = (types: Type[]) => {
  if (types.length) {
    if (types.length !== 1) {
      const typesName = types.map((type) => {
        return stringFormatter(type.type.name);
      });
      return `Types: ${typesName.join(", ")}`;
    }
    const type = stringFormatter(types[0].type.name);
    return `Type: ${type}`;
  }
};

// return a random english description
export const pokeDexDescription = (text: flavorText[]) => {
  const description = text.filter((text) => {
    return text.language.name === "en";
  });
  return description[Math.floor(Math.random() * description.length)]
    .flavor_text;
};
