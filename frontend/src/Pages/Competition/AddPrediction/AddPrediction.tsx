import {useEffect, useState} from "react";
import {getFinalStartTime} from "../../../logic/competitions";
import TooLateToAdd from "../../../Components/Predictions/TooLateToAdd/TooLateToAdd";
import AddPredictionForm from "../../../Components/Predictions/AddPredictionForm/AddPredictionForm";

const AddPrediction = (props: any) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const fetchData = async () => {
        const finalStartTime = await getFinalStartTime(props.competition.id, props.event.id);
        if (new Date(finalStartTime) > new Date()) {
            setIsAllowed(true);
            console.log("true");
        }
        console.log(finalStartTime);
    };
    useEffect(() => {
        fetchData();
    }, [props.competition, props.event]);

    return (
        <>
            {isAllowed ? <AddPredictionForm competition={props.competition} event={props.event}/> : <TooLateToAdd />}
        </>
    )
};

export default AddPrediction;