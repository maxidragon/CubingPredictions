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
                            //TODO
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Technical details
                        </Typography>
                        <Typography gutterBottom>
                          This website use an API provided by World Cube Association to fetch information about competitions.
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