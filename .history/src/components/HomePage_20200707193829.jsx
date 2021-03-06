import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({
  body: {
    width: 700,
    margin: '0 auto',
    padding: 20,
    height: '100vh',
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {



},
});

export const HomePage = () => {
  const classes = createHomePageStyles();

  return (
    <div className={classes.body}>
      {'Glazok'}
      <div className={classes.column}>

      </div>
      <div></div>
      <div className={classes.column}>

      </div>
    </div >
  );
};