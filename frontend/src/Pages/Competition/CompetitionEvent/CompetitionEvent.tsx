import Psychsheet from "../Psychsheet/Psychsheet";
import {isUserLoggedIn} from "../../../logic/auth";
import AddPrediction from "../AddPrediction/AddPrediction";
import {Typography} from "@mui/material";

const CompetitionEvent = (props: any) => {

return (
    <>
        {isUserLoggedIn() ? <AddPrediction competition={props.competition} event={props.event} /> : <Typography>Log in to predict results!</Typography>}
        <Psychsheet competition={props.competition} event={props.event.id} type={'average'} key={props.event.id} />
    </>
)
};

export default CompetitionEvent;