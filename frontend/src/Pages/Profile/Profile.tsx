import { useEffect, useState } from "react";
import { getUserInfo, getUserProfile, isUserLoggedIn } from "../../logic/auth";
import {
  Link as LinkComponent,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import UserPodiumPredictions from "./UserPredictions/UserPodiumPredictions";
import { Profile as ProfileInterface, User } from "../../logic/interfaces";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInterface>();
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
        navigate("/404");
      }
    };
    fetchData();
  }, [navigate, userId]);
  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await isUserLoggedIn();
      if (isLoggedIn) {
        const userData = await getUserInfo();
        setUser(userData);
      }
    };
    fetchData();
  }, []);

  if (!userId) {
    navigate("/404");
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          mt: 5,
          flexDirection: "column",
        }}
      >
        {isLoading || !profile ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4">{profile.username}</Typography>
            {profile.wcaId && (
              <Typography variant="h6">
                WCA ID:{" "}
                <Link
                  href={`https://worldcubeassociation.org/persons/${profile.wcaId}`}
                  underline="none"
                  target="_blank"
                >
                  {profile.wcaId}
                </Link>
              </Typography>
            )}
            <Typography variant="h6">Score: {profile.score}</Typography>
            <Typography variant="h6">
              Predictions: {profile.predictionsNumber}
            </Typography>
            {user && userId && +userId === +user.id && (
              <Link component={LinkComponent} to="/settings" underline="hover">
                Edit profile
              </Link>
            )}
            <UserPodiumPredictions userId={userId ? +userId : 0} />
          </>
        )}
      </Box>
    </>
  );
};

export default Profile;
