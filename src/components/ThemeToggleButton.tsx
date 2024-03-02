import React from 'react';
import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme();

  // You can add more sophisticated animations or visual effects here.
  // For simplicity, we're just switching icons based on the theme mode.
  const icon = mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />;

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.short,
        }),
        transform: mode === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      {icon}
    </IconButton>
  );
};

export default ThemeToggleButton;
