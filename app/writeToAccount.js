import { useState } from "react";
import { Button, Paper, ThemeIcon } from "@mantine/core";
import { SunIcon, MoonIcon } from "@modulz/radix-icons";
import { useTheme } from "@emotion/react";

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = useTheme();

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    theme.colorScheme = isDarkTheme ? "light" : "dark";
  };

  return (
    <Paper padding="lg">
      <h2>Theme Settings</h2>
      <p>Choose a theme for the app:</p>
      <Button
        onClick={toggleTheme}
        variant={isDarkTheme ? "light" : "outline"}
        leftIcon={
          <ThemeIcon>
            {isDarkTheme ? <SunIcon /> : <MoonIcon />}
          </ThemeIcon>
        }
      >
        {isDarkTheme ? "Light" : "Dark"} Theme
      </Button>
    </Paper>
  );
};

export default Settings;
