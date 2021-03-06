import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({


  [`@media (max-width: ${global.maxWidth}px)`]: {

   

  },
});

export const HomePage = () => {
  const classes = createHomePageStyles();

  return (
    <div className={classes.body}>
     {'Glazok'}
    </div >
  );
};