import {useEffect, useState} from "react";
import {getCompetitorsForEvent, getFinalStartTime, isRegistrationClosed} from "../../../logic/competitions";
import TooLateToAdd from "../../../Components/Predictions/TooLateToAdd/TooLateToAdd";
import AddPredictionForm from "../../../Components/Predictions/AddPredictionForm/AddPredictionForm";
import {getYourPrediction} from "../../../logic/predictions";
import AlreadyPredicted from "../../../Components/Predictions/AlreadyPredicted/AlreadyPredicted";
import {Typography} from "@mui/material";

const AddPrediction = (props: any) => {
    const [competitors, setCompetitors] = useState<any>([]);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [yourPrediction, setYourPrediction] = useState<any>(null);
    const [isPredicted, setIsPredicted] = useState<boolean>(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
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
                    thirdPlace: competitors.find((c: any) => c.wcaId === yourPredictionData.thirdPlaceWcaId)
                };
                setYourPrediction(prediction);
            }
            else {
                setIsPredicted(false);
            }
        };
        fetchData();
    }, [props.competition, props.event]);

    return (
        <>
            {isAllowed ?
                isRegistrationOpen ? <Typography variant="h6">You can add your prediction after registration closes.</Typography> :
                (isPredicted ? <AlreadyPredicted competition={props.competition} event={props.event} competitors={competitors} yourPrediction={yourPrediction}/>: <AddPredictionForm competition={props.competition} event={props.event} competitors={competitors} yourPrediction={yourPrediction}/> ) : <TooLateToAdd />}
        </>
    )
};

export default AddPrediction;