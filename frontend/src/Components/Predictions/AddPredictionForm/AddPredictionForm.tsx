import { SyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { addPodiumPrediction } from "../../../logic/predictions";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { Competitor, Event, PublicWCIF } from "../../../logic/interfaces";

const AddPredictionForm = (props: {
  competition: PublicWCIF;
  event: Event;
  competitors: Competitor[];
}) => {
  const confirm = useConfirm();
  const [allowedOptions, setAllowedOptions] = useState<Competitor[]>([]);
  const [firstPlace, setFirstPlace] = useState<Competitor | null>(null);
  const [secondPlace, setSecondPlace] = useState<Competitor | null>(null);
  const [thirdPlace, setThirdPlace] = useState<Competitor | null>(null);
  useEffect(() => {
    const options = [...props.competitors];
    options.push({ name: "No one", wcaId: "NONE", worldRank: 0, wcaUserId: 0 });
    options.sort((a, b) => {
      return a.worldRank - b.worldRank;
    });

    setAllowedOptions(options);
  }, [props.competitors]);
  const handleFirstPlaceChange = (
    event: SyntheticEvent,
    newValue: Competitor | null,
  ) => {
    setFirstPlace(newValue);
  };
  const handleSecondPlaceChange = (
    event: SyntheticEvent,
    newValue: Competitor | null,
  ) => {
    setSecondPlace(newValue);
  };
  const handleThirdPlaceChange = (
    event: SyntheticEvent,
    newValue: Competitor | null,
  ) => {
    setThirdPlace(newValue);
  };
  const handleSubmit = async () => {
    if (firstPlace && secondPlace && thirdPlace) {
      if (
        firstPlace.wcaId === "NONE" ||
        secondPlace.wcaId === "NONE" ||
        thirdPlace.wcaId === "NONE"
      ) {
        confirm({
          description:
            "You have selected 'No one' for one of the places. Are you sure you want to submit this prediction?",
        })
          .then(async () => {
            const message = await addPodiumPrediction(
              props.competition.id,
              props.competition.name,
              props.event.id,
              firstPlace.wcaId,
              secondPlace.wcaId,
              thirdPlace.wcaId,
            );
            if (message.statusCode === 201) {
              enqueueSnackbar(message.message, { variant: "success" });
            } else {
              enqueueSnackbar(message.message, { variant: "error" });
            }
          })
          .catch(() => {
            enqueueSnackbar("Prediction not submitted", { variant: "info" });
          });
      } else {
        confirm({
          description:
            "Are you sure you want to submit this prediction? You can't change it",
        })
          .then(async () => {
            const message = await addPodiumPrediction(
              props.competition.id,
              props.competition.name,
              props.event.id,
              firstPlace.wcaId,
              secondPlace.wcaId,
              thirdPlace.wcaId,
            );
            if (message.statusCode === 201) {
              enqueueSnackbar(message.message, { variant: "success" });
            } else {
              enqueueSnackbar(message.message, { variant: "error" });
            }
          })
          .catch(() => {
            enqueueSnackbar("Prediction not submitted", { variant: "info" });
          });
      }
    }
  };
  const textFieldStyle = {
    width: 250,
    mb: 2,
  };
  return (
    <>
      <Box>
        <Typography variant="h6">
          Add your podium prediction for {props.event.name} final at{" "}
          {props.competition.name}
        </Typography>
        {allowedOptions && (
          <>
            <Autocomplete
              id="firstPlaceSelect"
              options={allowedOptions}
              getOptionLabel={(competitor) =>
                competitor.name !== null ? competitor.name : ""
              }
              value={firstPlace}
              onChange={handleFirstPlaceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="First place"
                  variant="outlined"
                  sx={textFieldStyle}
                />
              )}
            />
            <Autocomplete
              id="secondPlaceSelect"
              options={allowedOptions}
              getOptionLabel={(competitor) =>
                competitor.name !== null ? competitor.name : ""
              }
              value={secondPlace}
              onChange={handleSecondPlaceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Second place"
                  variant="outlined"
                  sx={textFieldStyle}
                />
              )}
            />
            <Autocomplete
              id="thirdPlaceSelect"
              options={allowedOptions}
              getOptionLabel={(competitor) =>
                competitor.name !== null ? competitor.name : ""
              }
              value={thirdPlace}
              onChange={handleThirdPlaceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Third place"
                  variant="outlined"
                  sx={textFieldStyle}
                />
              )}
            />
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default AddPredictionForm;
