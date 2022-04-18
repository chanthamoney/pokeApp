import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function PokeSearchInput() {
  let navigate = useNavigate();

  const [pokeSearchInput, setPokeSearchInput] = useState("piplup");

  const routeChange = () => {
    navigate({
      pathname: "pokemonInfo",
      search: `?${createSearchParams({ pokemon: `${pokeSearchInput}` })}`,
    });
  };

  return (
    <span>
      <StyledTextField
        id="outlined-basic"
        label="Which Pokemon?"
        variant="filled"
        defaultValue={"piplup"}
        onChange={(event) => setPokeSearchInput(event.target.value)}
      />
      <StyledButton variant="contained" onClick={routeChange}>
        Search
      </StyledButton>
    </span>
  );
}

export const StyledTextField = styled(TextField)`
  background: white;
`;

export const StyledButton = styled(Button)`
  background: white;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;
