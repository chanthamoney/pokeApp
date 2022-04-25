import { useSearchParams } from "react-router-dom";
import { getPokemon, getPokemonSpecies } from "../api/pokeApi";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { stringFormatter, pokeTypeHandler } from "../utils";
import { AxiosError } from "axios";
import NotFound from "./notFound";
import PokeLearnMoreDialog from "../components/pokeLearnMoreDialog";

interface PokeCard {
  id: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: [
    {
      slot: string;
      type: {
        name: string;
        url: string;
      };
    }
  ];
}

export default function PokemonInfo() {
  const [searchParams] = useSearchParams();
  const pokemon = searchParams.get("pokemon");
  const [cardInfo, setCardInfo] = useState<PokeCard>();
  const [err, setErr] = useState<Number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgUrl = cardInfo?.sprites.other["official-artwork"].front_default;
  const id = cardInfo?.id;
  // TODO: only do this helper when api call is done?
  const type = pokeTypeHandler(cardInfo?.types ?? []);
  const [description, setDescription] = useState<string>();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon)
        .then((res) => {
          setCardInfo(res);
          // if the api response is successful and we can get that pokemon, do other api call
          getPokemonSpecies(pokemon).then((res) => setDescription(res));
        })
        .catch((reason: AxiosError) => {
          setErr(reason.response?.status);
        });
    }
  }, [pokemon]);

  if (err === 404) {
    return <NotFound pokemon={pokemon ?? ""} />;
  }

  return pokemon && cardInfo ? (
    <div className="pokesearchDiv">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing="0"
        style={{ minHeight: "100vh", background: "#fa6f4c" }}
      >
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="400"
              image={imgUrl}
              alt={`${pokemon} art work`}
            />
            <Divider />
            <CardContent sx={{ background: "#c4c4c4" }}>
              <Typography gutterBottom variant="h5">
                {stringFormatter(pokemon)}
              </Typography>
              <Typography variant="h6">{description}</Typography>
              <Typography variant="h6">Pokédex #{id}</Typography>
              <Typography variant="h6">{type}</Typography>
            </CardContent>
            <CardActions sx={{ background: "#c4c4c4" }}>
              <Button
                size="small"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Learn more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <PokeLearnMoreDialog
        open={isModalOpen}
        handleClose={handleClose}
        type={cardInfo?.types}
        img={imgUrl ?? ""}
      />
    </div>
  ) : null;
}
