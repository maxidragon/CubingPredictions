import {useState} from "react";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import {addPodiumPrediction} from "../../../logic/predictions";
import {useSnackbar} from "notistack";

const AddPredictionForm = (props: any) => {
    const [firstPlace, setFirstPlace] = useState<any>(null);
    const [secondPlace, setSecondPlace] = useState<any>(null);
    const [thirdPlace, setThirdPlace] = useState<any>(null);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const handleFirstPlaceChange = (event: any, newValue: any) => {
        setFirstPlace(newValue);
    };
    const handleSecondPlaceChange = (event: any, newValue: any) => {
        setSecondPlace(newValue);
    };
    const handleThirdPlaceChange = (event: any, newValue: any) => {
        setThirdPlace(newValue);
    };
    const handleSubmit = async () => {
        const message = await addPodiumPrediction(props.competition.id, props.event.id, firstPlace.wcaId, secondPlace.wcaId, thirdPlace.wcaId);
        console.log(message);
        if (message.statusCode === 201) {
            enqueueSnackbar(message.message, {variant: "success"});
        } else {
            enqueueSnackbar(message.message, {variant: "error"});
        }
    };
    const textFieldStyle = {
        width: 250,
        mb: 2
    };
    return (
        <>
            <Box>
                <Typography variant="h6">Add your podium prediction for {props.event.name} final
                    at {props.competition.name}</Typography>
                <Autocomplete
                    id="firstPlaceSelect"
                    options={props.competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={firstPlace}
                    onChange={handleFirstPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="First place" variant="outlined" sx={textFieldStyle}/>
                    )}
                />
                <Autocomplete
                    id="secondPlaceSelect"
                    options={props.competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={secondPlace}
                    onChange={handleSecondPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Second place" variant="outlined" sx={textFieldStyle}/>
                    )}
                />
                <Autocomplete
                    id="thirdPlaceSelect"
                    options={props.competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={thirdPlace}
                    onChange={handleThirdPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Third place" variant="outlined" sx={textFieldStyle}/>
                    )}
                />
                <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </>
    )
};

export default AddPredictionForm;