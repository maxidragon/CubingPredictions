import {useEffect, useState} from "react";
import {getUserProfile} from "../../logic/auth";
import {useNavigate, useParams} from "react-router-dom";
import {Box, CircularProgress, Typography} from "@mui/material";

const Profile = () => {
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

            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', mt: 5}}>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        <Typography variant="h4">{profile.username}</Typography>
                        {profile.wcaId && (
                            <Typography variant="h6">WCA ID: {profile.wcaId}</Typography>
                        )}
                    </>
                )}

            </Box>
        </>
    )
}

export default Profile;