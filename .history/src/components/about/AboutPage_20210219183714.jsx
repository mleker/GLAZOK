import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const createAboutPageStyles = createUseStyles(() => ({
  rootPage: ({ background, color }) => ({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: color,
    backgroundColor: background,
    overflow: 'hidden',
}),

  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {

    },
  },
}));

const createRootPageStyles = createUseStyles(() => ({

  rootPage: ({ background, color }) => ({
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: color,
      backgroundColor: background,
      overflow: 'hidden',
  }),

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
