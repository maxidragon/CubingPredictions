import {getCompetitorsForEvent} from "../../../logic/competitions";
import {useEffect, useState} from "react";

const AddPredictionForm = (props: any) => {
    const [competitors, setCompetitors] = useState<any>([]);
    const fetchData = async () => {
        const competitors = await getCompetitorsForEvent(props.competition.persons, props.event.id);
        setCompetitors(competitors);
        console.log(competitors);
    };
    useEffect(() => {
        fetchData();
    }, [props.competition, props.event]);
    return (
        <>
            form
        </>
    )
};

export default AddPredictionForm;