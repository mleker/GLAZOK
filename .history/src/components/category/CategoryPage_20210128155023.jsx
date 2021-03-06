
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

const createCategoryPageStyles = createUseStyles(() => ({
  body: {
    paddingTop: 20,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {
      width: '100%',
      margin: 0,
      color: 'white',
    },
  },
}));

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export const CategoryPage = ({ category, categories }) => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  const classes = createCategoryPageStyles();

  return (
    <>
      {categories && winWidth > global.maxWidth && (
        <div className={classes.body}>
          <Header categories={categories}/>
          <div>
            {category.name}
          </div>
          <Footer />
        </div>
      )}
      {categories && winWidth <= global.maxWidth && (
        <div className={classes.body}>
          {category.name}
        </div>
      )}
    </>
  );
};
