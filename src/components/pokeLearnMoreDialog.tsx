import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { pokemonAttackCalculator, pokemonWeakCalulator } from "../helpers";
import { Type } from "../interfaces";

interface pokeLearnMoreDialogProps {
  open: boolean;
  handleClose: () => void;
  type: Array<Type>;
  img: string;
}

export default function PokeLearnMoreDialog(props: pokeLearnMoreDialogProps) {
  const { open, handleClose, type, img } = props;
  const atkDescription = pokemonAttackCalculator(type);
  const weakDescription = pokemonWeakCalulator(type);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ minWidth: 600, minHeight: 800 }}>
        <CardContent>
          <CardMedia component="img" height="500" image={img} />
          <Typography component="div" variant="h5">
            {atkDescription}
          </Typography>
          <Typography component="div" variant="h5">
            {weakDescription}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
}
