import {Typography} from "@mui/material";

const AlreadyPredicted = (props: any) => {
    return (
        <>
            <Typography variant="h6">You have already predicted {props.event.name} final
                at {props.competition.name}</Typography>
            {props.yourPrediction.firstPlace && (<>
                    <Typography variant="body1">Your prediction:</Typography>
                    <Typography variant="body1">1. {props.yourPrediction.firstPlace.name}</Typography>
                    <Typography variant="body1">2. {props.yourPrediction.secondPlace.name}</Typography>
                    <Typography variant="body1">3. {props.yourPrediction.thirdPlace.name}</Typography>
                </>
            )}
        </>
    )
};

export default AlreadyPredicted;