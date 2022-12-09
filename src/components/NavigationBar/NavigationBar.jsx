import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Routes from '../../routes';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
 } from '@mui/material';
 import {
  useLocation
} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//     drawer: {
//       width: 300,
//     },
//     fullList: {
//       width: 'auto',
//     },
//   }),
// );

const NavigationBar = (props) => {
  const classes = [];
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event ) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Telegram Analyzer
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer classes={{ paper: classes.drawer }} open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList>
            {Routes.filter(x => x.sidebarName)
            .map((prop, key) => {
              return (
                <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                  <MenuItem selected={activeRoute(prop.path)}>
                    {prop.icon} <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </NavLink>
              );
            })}
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationBar;
