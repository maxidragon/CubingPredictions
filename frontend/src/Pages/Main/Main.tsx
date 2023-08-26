import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Cubing predictions
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Website for predicting results of WCA competitions. Check{" "}
            <Link component={LinkComponent} to="/about" underline="hover">
              about page
            </Link>{" "}
            for more information.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ maxWidth: 345, ml: 5 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://cdn.pixabay.com/photo/2016/08/26/19/02/medals-1622902_1280.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Podium predictions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Predict the podium of all events which will take place in the
                  competition.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={LinkComponent} to="/podium">
                  Competitions
                </Button>
                <Button
                  size="small"
                  component={LinkComponent}
                  to="/podium/ranking"
                >
                  Ranking
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Main;
