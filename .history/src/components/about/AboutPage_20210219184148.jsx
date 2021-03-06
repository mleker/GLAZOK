import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../App';
import { Footer } from '../footer/Footer';
import { HeaderSlide } from '../header/HeaderSlide';

const createAboutPageStyles = createUseStyles(() => ({

  aboutPage: ({ background, color }) => ({
    width: '100%',
    color: color,
    backgroundColor: background,
  }),

  [`@media (max-width: ${global.maxWidth}px)`]: {

  },
}));

export const AboutPage = () => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {

  })

  const classes = createAboutPageStyles({ background: theme.background, color: theme.color });

  return (
    <>
      {winWidth > global.maxWidth && (
        <div className={classes.aboutPage}>
          {'ABOUT'}
          <Footer />
        </div>
      )}
      {winWidth <= global.maxWidth && (
        <div className={classes.aboutPage}>
          <HeaderSlide
            categories={categories}
            initialCurrentItem={initialCurrentItem}
            onMenuClick={onMenuClick}
          />
          {'ABOUT'}
        </div>
      )}
    </>
  );
};
