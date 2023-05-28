import {getUpcomingCompetitions} from '../../logic/competitions';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Box, CircularProgress, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material';
import CompetitionFlagIcon from '../../Components/CompetitionFlagIcon';

const PodiumPredictions = () => {
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        const upcomingCompetitions = await getUpcomingCompetitions();
        console.log(upcomingCompetitions);
        setCompetitions(upcomingCompetitions);
        if (competitions.length > 0) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Box
                sx={{
                    py: {xs: 2, md: 3},
                    px: {xs: 1, md: 3},
                    display: 'flex',
                    minHeight: '100%',
                }}
            >
                <Grid container spacing={2} direction="column" sx={{flexGrow: 1}}>
                    <Grid item>
                        <Paper>
                            {isLoading ? (<Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></Box>) : (
                            <List dense={true} disablePadding>
                                {competitions.map((competition) => (
                                    <ListItemButton
                                        key={competition.id}
                                        component={Link}
                                        to={`/competitions/${competition.id}`}
                                        disabled={competition.isRegistrationOpen}
                                    >
                                        <ListItemIcon>
                                            <ListItemIcon sx={{p: 2}}>
                                                <CompetitionFlagIcon country={competition.countryIso2} height="2"/>
                                            </ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={competition.name}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                            )  }
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default PodiumPredictions;