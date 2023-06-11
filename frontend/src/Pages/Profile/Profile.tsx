import {useEffect, useState} from "react";
import {getUser, getUserProfile} from "../../logic/auth";
import {Link as LinkComponent, useNavigate, useParams} from "react-router-dom";
import {Box, CircularProgress, Link, Typography} from "@mui/material";

const Profile = () => {
    const user = getUser();
    const {userId} = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (userId) {
                const profile = await getUserProfile(+userId);
                console.log(profile);
                setProfile(profile);
                setIsLoading(false);
            } else {
                navigate('/404')
            }
        };
        fetchData();
    }, [navigate, userId]);
    return (
        <>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                mt: 5,
                flexDirection: 'column'
            }}>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        <Typography variant="h4">{profile.username}</Typography>
                        {profile.wcaId && (
                            <Typography variant="h6">WCA ID: {profile.wcaId}</Typography>
                        )}
                        {userId && +userId === user.id && (
                            <Link
                                component={LinkComponent}
                                to="/settings"
                                underline="hover"
                            >
                                Edit profile
                            </Link>
                        )}
                    </>

                )}

            </Box>
        </>
    )
}

export default Profile;