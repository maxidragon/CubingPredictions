import {getCompetitorsForEvent} from "../../../logic/competitions";
import {useEffect, useState} from "react";
import {Autocomplete, Box} from "@mui/material";
import TextField from "@mui/material/TextField";

const AddPredictionForm = (props: any) => {
    const [competitors, setCompetitors] = useState<any>([]);
    const [firstPlace, setFirstPlace] = useState<any>(null);
    const [secondPlace, setSecondPlace] = useState<any>(null);
    const [thirdPlace, setThirdPlace] = useState<any>(null);
    const fetchData = async () => {
        const competitors = await getCompetitorsForEvent(props.competition.persons, props.event.id);
        setCompetitors(competitors);
        console.log(competitors);
    };
    useEffect(() => {
        fetchData();
    }, [props.competition, props.event]);

    const handleFirstPlaceChange = (event: any, newValue: any) => {
        setFirstPlace(newValue);
    };
    const handleSecondPlaceChange = (event: any, newValue: any) => {
        setSecondPlace(newValue);
    };
    const handleThirdPlaceChange = (event: any, newValue: any) => {
        setThirdPlace(newValue);
    };
    const textFieldStyle = {
        width: 250,
        mb: 2
    }
    return (
        <>
            <Box sx={{
                minWidth: 120,
                maxWidth: 200,
                margin: 'auto',
            }}>
                <Autocomplete
                    id="firstPlaceSelect"
                    options={competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={firstPlace}
                    onChange={handleFirstPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="First place" variant="outlined" sx={textFieldStyle}/>
                    )}
                />
                <Autocomplete
                    id="secondPlaceSelect"
                    options={competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={secondPlace}
                    onChange={handleSecondPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Second place" variant="outlined" sx={textFieldStyle}/>
                    )}
                />
                <Autocomplete
                    id="thirdPlaceSelect"
                    options={competitors}
                    getOptionLabel={(competitor) => competitor.name !== null ? competitor.name : ''}
                    value={thirdPlace}
                    onChange={handleThirdPlaceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Third place" variant="outlined" sx={textFieldStyle} />
                    )}
                />
            </Box>
        </>
    )
};

export default AddPredictionForm;