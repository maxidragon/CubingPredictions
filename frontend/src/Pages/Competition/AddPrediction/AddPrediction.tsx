import {useEffect, useState} from "react";
import {getCompetitorsForEvent, getFinalStartTime, isRegistrationClosed} from "../../../logic/competitions";
import AddPredictionForm from "../../../Components/Predictions/AddPredictionForm/AddPredictionForm";
import {getYourPrediction} from "../../../logic/predictions";
import AlreadyPredicted from "../../../Components/Predictions/AlreadyPredicted/AlreadyPredicted";
import {Box, CircularProgress, Typography} from "@mui/material";
import TooLateToAdd from "../../../Components/Predictions/TooLateToAdd/TooLateToAdd";

const AddPrediction = (props: any) => {
    const [competitors, setCompetitors] = useState<any>([]);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [yourPrediction, setYourPrediction] = useState<any>(null);
    const [isPredicted, setIsPredicted] = useState<boolean>(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const finalStartTime = await getFinalStartTime(props.competition.id, props.event.id);
            if (new Date(finalStartTime) > new Date()) {
                setIsAllowed(true);
            }
            if (await isRegistrationClosed(props.competition.id)) {
                setIsRegistrationOpen(false);
            }
            const competitors = await getCompetitorsForEvent(props.competition.persons, props.event.id);
            setCompetitors(competitors);
            const yourPredictionData = await getYourPrediction(props.competition.id, props.event.id);
            if (yourPredictionData.statusCode !== 404) {
                setIsPredicted(true);
                const prediction = {
                    firstPlace: competitors.find((c: any) => c.wcaId === yourPredictionData.firstPlaceWcaId),
                    secondPlace: competitors.find((c: any) => c.wcaId === yourPredictionData.secondPlaceWcaId),
                    thirdPlace: competitors.find((c: any) => c.wcaId === yourPredictionData.thirdPlaceWcaId),
                    isChecked: yourPredictionData.isChecked,
                    score: yourPredictionData.score,
                };
                setYourPrediction(prediction);
            } else {
                setIsPredicted(false);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [props.competition, props.event]);
    return (
        <>
            {isLoading ? <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}><CircularProgress/></Box> : (
                (isPredicted ?
                    <AlreadyPredicted competition={props.competition} event={props.event}
                                      competitors={competitors} yourPrediction={yourPrediction}/> : (
                        isRegistrationOpen ? <Typography variant="h6">You can add your prediction after registration
                            closes.</Typography> : (
                            isAllowed ? <AddPredictionForm competition={props.competition} event={props.event}/> :
                                <TooLateToAdd/>
                        )
                    )))}
        </>
    )
};

export default AddPrediction;