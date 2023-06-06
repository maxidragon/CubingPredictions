import {Box, Grid, Link, Typography} from '@mui/material';

const About = () => {
    return (
        <>
            <Box
                sx={{
                    py: { xs: 2, md: 3 },
                    px: { xs: 1, md: 3 },
                }}
            >
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            About
                        </Typography>
                        <Typography gutterBottom>
                           Cubing predictions is a website for predicting results of{' '}
                            <Link
                                href="https://en.wikipedia.org/wiki/Speedcubing"
                                underline="hover"
                            >
                                Speedcubing
                            </Link>{' '}
                            competitions governed by the{' '}
                            <Link
                                href="https://www.worldcubeassociation.org/about"
                                underline="hover"
                            >
                                World Cube Association
                            </Link>
                            .
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                           How it works?
                        </Typography>
                        <Typography>
                            The website uses a public API provided by WCA to retrieve competition data. You can find the competitions that interest you and try to predict who will make it to the podium in each event. Currently, you can only select competitors who have a WCA ID. If you correctly predict all three individuals, you will receive 20 points. In the case of two correct predictions, you will receive 15 points. If you correctly predict one person, you will receive 10 points. If you have two correct predictions but in the wrong order, you will receive 5 points. If none of the individuals match, you will receive 0 points. You can make predictions after the registration closes until the start of the respective final. Currently, it is not possible to change your selections, but in the future, it will be allowed with a lower point reward. In the future, there will likely be more prediction options, with a focus on record predictions.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Technical details
                        </Typography>
                        <Typography gutterBottom>
                           If you want to check the source code you can do it! Cubing predictions is an open source project and you can find the code on{' '}
                            <Link href="https://github.com/maxidragon/CubingPredictions" underline="hover">
                                GitHub
                            </Link>
                            .
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Contact
                        </Typography>
                        <Typography>
                         If you have any questions to me please write an email to{' '}
                            <Link
                                href="mailto:contact@maksymiliangala.com"
                                underline="hover"
                            >
                                contact@maksymiliangala.com
                            </Link>
                            {' '} or add me on Discord - maxidragon#7256.
                            In case of bug reports or you have suggestions to this website feel free to submit a{' '}
                            <Link
                                href="https://github.com/maxidragon/CubingPredictions/issues"
                                underline="hover"
                            >
                                GitHub issue
                            </Link>
                            .
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default About;