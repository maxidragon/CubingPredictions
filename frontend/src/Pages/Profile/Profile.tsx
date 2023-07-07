import { useEffect, useState } from "react";
import { getUserInfo, getUserProfile } from "../../logic/auth";
import { Link as LinkComponent, useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import UserPodiumPredictions from "./UserPredictions/UserPodiumPredictions";

const Profile = () => {
    const user = getUserInfo();
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (userId) {
                const profile = await getUserProfile(+userId);
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
                    <CircularProgress />
                ) : (
                    <>
                        <Typography variant="h4">{profile.username}</Typography>
                        {profile.wcaId && (
                            <Typography variant="h6">WCA ID: {' '}
                                <Link href={`https://worldcubeassociation.org/persons/${profile.wcaId}`} underline="none" target="_blank">
                                    {profile.wcaId}
                                </Link>
                            </Typography>
                        )}
                        <Typography variant="h6">Score: {profile.score}</Typography>
                        <Typography variant="h6">Predictions: {profile.predictionsNumber}</Typography>
                        {userId && +userId === user.id && (
                            <Link
                                component={LinkComponent}
                                to="/settings"
                                underline="hover"
                            >
                                Edit profile
                            </Link>
                        )}
                        <UserPodiumPredictions userId={userId} />
                    </>
                )}
            </Box>
        </>
    )
}

export default Profile;