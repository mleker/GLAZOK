import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({
  body: {
    width: '60%',
    margin: '0 auto',
  }

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