import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const createAboutPageStyles = createUseStyles(() => ({
  body: {

  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {

    },
  },
}));

export const AboutPage = () => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {

  })

  const classes = createAboutPageStyles();

  return (
    <>
      {winWidth > global.maxWidth && (
        <div className={classes.body}>
          {'ABOUT'}
        </div>
      )}
      {winWidth <= global.maxWidth && (
        <div className={classes.body}>
          {'ABOUT'}
        </div>
      )}
    </>
  );
};
