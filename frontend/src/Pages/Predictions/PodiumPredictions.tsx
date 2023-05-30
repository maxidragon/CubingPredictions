import {searchCompetitions} from '../../logic/competitions';
import {useState} from "react";
import {Link} from 'react-router-dom';
import {Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography} from '@mui/material';
import CompetitionFlagIcon from '../../Components/CompetitionFlagIcon';

const PodiumPredictions = () => {
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const handleSearch = async (event: any) => {
        setSearchText(event.target.value);
        const searchedCompetitions = await searchCompetitions(event.target.value);
        setCompetitions(searchedCompetitions);
    };

    return (
        <>
            <Box
                sx={{
                    py: {xs: 2, md: 3},
                    px: {xs: 1, md: 3},
                    display: 'flex',
                    minHeight: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid container spacing={2} direction="column" sx={{ flexGrow: 1 }}>
                    <Grid item>
                        <Typography variant="h5" sx={{marginBottom: '0.2em'}}>
                            Search for competition
                        </Typography>
                        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch} value={searchText}/>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <List dense={true} disablePadding>
                                {competitions && competitions.map((competition) => (
                                    <ListItemButton
                                        key={competition.id}
                                        component={Link}
                                        to={`/competitions/${competition.id}`}
                                    >
                                        <ListItemIcon>
                                            <ListItemIcon sx={{p: 2}}>
                                                <CompetitionFlagIcon country={competition.country_iso2} height="2"/>
                                            </ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={competition.name}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default PodiumPredictions;