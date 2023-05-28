import Psychsheet from "../Psychsheet/Psychsheet";

const CompetitionEvent = (props: any) => {

return (
    <>
        <Psychsheet competition={props.competition} event={props.event.id} type={'average'} key={props.event.id} />
    </>
)
};

export default CompetitionEvent;