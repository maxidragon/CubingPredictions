import {getCompetitionInfo} from '../../logic/competitions';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import CompetitionSidebar from "../../Layout/CompetitionSidebar";
import {Box, Container, Divider, IconButton, Toolbar, Typography} from "@mui/material";
import Drawer from "../../Layout/Drawer";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppBar from '../../Layout/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from "@mui/icons-material/GitHub";
import events from './../../logic/events';
import CompetitionEvent from './CompetitionEvent/CompetitionEvent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginPartial from "../../Layout/LoginPartial";

const Competition = (props: any) => {
    const {competitionId} = useParams<{competitionId: string}>();
    const [competition, setCompetition] = useState<any>({});
    const [open, setOpen] = useState(true);
    const [event, setEvent] = useState<any>({});
    const fetchData = async () => {
        if (competitionId) {
            const info = await getCompetitionInfo(competitionId);
            console.log(info);
            setCompetition(info);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleEventChange = (id: string) => {
        const newEvent = events.find(e => e.id === id);
        if (newEvent) {
            setEvent(newEvent);
            console.log(newEvent);
        }
    };
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}} sx={{textDecoration: 'none'}}>
                            {competition.name}
                        </Typography>
                        <LoginPartial />
                        <IconButton href="https://github.com/maxidragon/CubingPredictions" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon sx={{color: "#fff"}} fontSize="large"/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton
                            component={Link}
                            to="/"
                            aria-label="Homepage"
                            size="large"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <CompetitionSidebar competition={competition} onEventChange={handleEventChange}/>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container sx={{mt: 4, mb: 4, width: '100vh'}}>
                        <CompetitionEvent competition={competition} event={event} />
                    </Container>

                </Box>
            </Box>

        </>
    )
};

export default Competition;