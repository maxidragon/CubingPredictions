import * as React from "react";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../logic/settings";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import { Settings as SettingsInterface } from "../../logic/interfaces";

const Settings = () => {
  const [settings, setSettings] = useState<SettingsInterface | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSettings();
      setSettings(data);
    };
    fetchData();
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      email: event.target.value,
    });
  };
  const handleWcaIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      wcaId: event.target.value,
    });
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      username: event.target.value,
    });
  };
  const handleSubmit = async () => {
    if (!settings) return;
    const status = await updateSettings(settings);
    if (status === 200) {
      enqueueSnackbar("Settings has been updated", { variant: "success" });
    } else {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          mt: 5,
          mb: 10,
        }}
      >
        <>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid item>
              <Typography variant="h5">Settings</Typography>
            </Grid>
            {settings ? (
              <>
                <Grid item>
                  <TextField
                    margin="normal"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={settings.email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    id="username"
                    label="Username"
                    name="username"
                    defaultValue={settings.username}
                    onChange={handleUsernameChange}
                    autoComplete="username"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    id="wcaId"
                    label="WCA ID"
                    name="wcaId"
                    defaultValue={settings.wcaId}
                    onChange={handleWcaIdChange}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit}>
                    Update
                  </Button>
                </Grid>
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </>
      </Box>
    </>
  );
};

export default Settings;
