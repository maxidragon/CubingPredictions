import {useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './../../../Layout/Copyright';
import {forgotPassword} from "../../../logic/auth";
import {enqueueSnackbar} from "notistack";


const ForgotPassword = () => {
    const emailRef: any = useRef();
    const handleSubmit = async () => {
        if (emailRef.current.value === '') {
            return;
        } else {
            const status = await forgotPassword(emailRef.current.value);
            if (status === 201) {
                enqueueSnackbar('Success, check your email', {variant: "success"});
            } else if (status === 404) {
                enqueueSnackbar('User with this email does not exist', {variant: "error"});
            } else {
                enqueueSnackbar('Error while sending email', {variant: "error"});
            }
        }
    };

    return (
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?city,night)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forgot password?
                        </Typography>
                        <Box sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                fullWidth
                                inputRef={emailRef}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={handleSubmit}
                            >
                               Send reset link
                            </Button>
                            <Grid item sx={{mt: 20}}>
                                <Copyright />
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default ForgotPassword;