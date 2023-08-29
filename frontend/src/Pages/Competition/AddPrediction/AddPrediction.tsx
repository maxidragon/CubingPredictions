import { useEffect, useState } from "react";
import {
  getCompetitorsForEvent,
  getFinalStartTime,
  isRegistrationClosed,
} from "../../../logic/competitions";
import AddPredictionForm from "../../../Components/Predictions/AddPredictionForm/AddPredictionForm";
import { getYourPrediction } from "../../../logic/predictions";
import AlreadyPredicted from "../../../Components/Predictions/AlreadyPredicted/AlreadyPredicted";
import { Box, CircularProgress, Typography } from "@mui/material";
import TooLateToAdd from "../../../Components/Predictions/TooLateToAdd/TooLateToAdd";
import {
  Competitor,
  Event,
  Prediction,
  PublicWCIF,
} from "../../../logic/interfaces";

const AddPrediction = (props: { competition: PublicWCIF; event: Event }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [yourPrediction, setYourPrediction] = useState<Prediction | null>(null);
  const [isPredicted, setIsPredicted] = useState<boolean>(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (await isRegistrationClosed(props.competition.id)) {
        setIsRegistrationOpen(false);
      }
      const competitors = await getCompetitorsForEvent(
        props.competition.persons,
        props.event.id,
      );
      competitors.filter((c) => c.wcaId !== null);
      setCompetitors(competitors);
      const yourPredictionData = await getYourPrediction(
        props.competition.id,
        props.event.id,
      );
      if (yourPredictionData.statusCode !== 404) {
        setIsPredicted(true);
        const prediction = {
          firstPlace: competitors.find(
            (c: Competitor) => c.wcaId === yourPredictionData.firstPlaceWcaId,
          ) || { name: "No one", wcaUserId: 0, wcaId: "", worldRank: 0 },
          secondPlace: competitors.find(
            (c: Competitor) => c.wcaId === yourPredictionData.secondPlaceWcaId,
          ) || { name: "No one", wcaUserId: 0, wcaId: "", worldRank: 0 },
          thirdPlace: competitors.find(
            (c: Competitor) => c.wcaId === yourPredictionData.thirdPlaceWcaId,
          ) || { name: "No one", wcaUserId: 0, wcaId: "", worldRank: 0 },
          isChecked: yourPredictionData.isChecked,
          score: yourPredictionData.score,
        };
        setYourPrediction(prediction);
      } else {
        setIsPredicted(false);
      }
      setIsLoading(false);
    };

    const fetchFinalStartTime = async () => {
      const finalStartTime = await getFinalStartTime(
        props.competition.id,
        props.event.id,
      );
      if (!finalStartTime) return;
      if (new Date(finalStartTime).getTime() < new Date().getTime()) {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    };

    Promise.all([fetchData(), fetchFinalStartTime()]);
  }, [props.event, props.competition.id, props.competition.persons]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    if (isPredicted) {
      return (
        <AlreadyPredicted
          competition={props.competition}
          event={props.event}
          yourPrediction={yourPrediction}
        />
      );
    }
    if (isRegistrationOpen) {
      return (
        <Typography variant="h6">
          You can add your prediction after registration closes.
        </Typography>
      );
    }
    if (isAllowed) {
      return (
        <AddPredictionForm
          competition={props.competition}
          event={props.event}
          competitors={competitors}
        />
      );
    }
    return <TooLateToAdd />;
  }
};

export default AddPrediction;
