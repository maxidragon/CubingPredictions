import Psychsheet from "../Psychsheet/Psychsheet";
import {isUserLoggedIn} from "../../../logic/auth";
import AddPrediction from "../AddPrediction/AddPrediction";

const CompetitionEvent = (props: any) => {

return (
    <>
        {isUserLoggedIn() ? <AddPrediction competition={props.competition} event={props.event} /> : <></>}
        <Psychsheet competition={props.competition} event={props.event.id} type={'average'} key={props.event.id} />
    </>
)
};

export default CompetitionEvent;