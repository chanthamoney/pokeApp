import styled from "@emotion/styled";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import unown from "../unown.png";

interface NotFoundProps {
  pokemon?: string;
}

const NotFound = ({ pokemon }: NotFoundProps) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing="0"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="400"
            image={unown}
            alt="unown image"
          />
          <Divider />
          <CardContent sx={{ background: "#f17575" }}>
            <Typography gutterBottom variant="h5">
              {pokemon} not found 404
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NotFound;
