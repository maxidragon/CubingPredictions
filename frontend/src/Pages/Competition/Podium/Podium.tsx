import { useEffect, useState } from "react";
import { getPodiumForEvent } from "../../../logic/competitions";
import { Box, Typography } from "@mui/material";
import {
  Event,
  Podium as PodiumInterface,
  PublicWCIF,
} from "../../../logic/interfaces";

const Podium = (props: { competition: PublicWCIF; event: Event }) => {
  const [ranking, setRanking] = useState<PodiumInterface>();
  useEffect(() => {
    const generateRankingData = () => {
      if (props.competition.persons) {
        const generatedRanking = getPodiumForEvent(
          props.competition,
          props.event.id,
        );
        if (!generatedRanking) return;
        setRanking(generatedRanking);
      }
    };
    generateRankingData();
  }, [props.competition, props.event]);
  return (
    <>
      <Box sx={{ mb: 5, mt: 2 }}>
        {ranking &&
          ranking.firstPlace &&
          ranking.secondPlace &&
          ranking.thirdPlace && (
            <>
              <Typography variant="h5">Competition is over.</Typography>
              <Typography variant="h5">
                Podium for {props.event.name}
              </Typography>
              <Typography variant="body1">
                1. {ranking.firstPlace.name} {ranking.firstPlace.wcaId}
              </Typography>
              <Typography variant="body1">
                2. {ranking.secondPlace.name} {ranking.secondPlace.wcaId}
              </Typography>
              <Typography variant="body1">
                3. {ranking.thirdPlace.name} {ranking.thirdPlace.wcaId}
              </Typography>
            </>
          )}
      </Box>
    </>
  );
};

export default Podium;
