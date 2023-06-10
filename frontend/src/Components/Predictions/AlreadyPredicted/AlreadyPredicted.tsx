import {Typography} from "@mui/material";

const AlreadyPredicted = (props: any) => {
    return (
        <>
            <Typography variant="h6">You have already predicted {props.event.name} final
                at {props.competition.name}</Typography>
            {props.yourPrediction.firstPlace && (<>
                    <Typography variant="body1">Your prediction:</Typography>
                    <Typography
                        variant="body1">1. {props.yourPrediction.firstPlace.name} ({props.yourPrediction.firstPlace.wcaId})</Typography>
                    <Typography
                        variant="body1">2. {props.yourPrediction.secondPlace.name} ({props.yourPrediction.secondPlace.wcaId})</Typography>
                    <Typography
                        variant="body1">3. {props.yourPrediction.thirdPlace.name} ({props.yourPrediction.thirdPlace.wcaId})</Typography>
                    {props.yourPrediction.isChecked ?
                        (
                            <>
                                <Typography variant="body1">Your prediction has been checked</Typography>
                                <Typography variant="body1">You have
                                    earned {props.yourPrediction.score} points</Typography>
                            </>
                        ) : (
                            <Typography variant="body1" >Your prediction has not been checked yet</Typography>
                            )
                    }
                </>
            )}
        </>
    )
};

export default AlreadyPredicted;