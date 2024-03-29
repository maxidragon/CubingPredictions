import Psychsheet from "../Psychsheet/Psychsheet";
import { isUserLoggedIn } from "../../../logic/auth";
import AddPrediction from "../AddPrediction/AddPrediction";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Podium from "../Podium/Podium";
import { Event, PublicWCIF } from "../../../logic/interfaces";

const CompetitionEvent = (props: {
  competition: PublicWCIF | null;
  event: Event;
}) => {
  const [isEnded, setIsEnded] = useState(false);
  useEffect(() => {
    const now = new Date();
    if (props.competition) {
      const startDate = new Date(props.competition.schedule.startDate);
      const endDate = new Date(startDate);
      if (endDate.getDate() === 1) {
        endDate.setDate(7);
      }
      endDate.setDate(
        startDate.getDate() + props.competition.schedule.numberOfDays,
      );
      if (now.getTime() > endDate.getTime()) {
        setIsEnded(true);
      }
    }
  }, [props.competition, isEnded]);

  if (!props.competition) return <></>;

  return (
    <>
      {isUserLoggedIn() ? (
        <AddPrediction competition={props.competition} event={props.event} />
      ) : (
        <Typography>Log in to predict results!</Typography>
      )}
      {isEnded ? (
        <Podium competition={props.competition} event={props.event} />
      ) : (
        <Psychsheet
          competition={props.competition}
          event={props.event}
          type={"average"}
        />
      )}
    </>
  );
};

export default CompetitionEvent;
