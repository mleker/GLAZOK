import React from 'react';
import { createUseStyles } from 'react-jss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

const createHomePageStyles = createUseStyles(() => ({
  body: {
    paddingTop: 20,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {
      width: '100%',
      margin: 0,
    },
  },
}));

const api = 'http://localhost:8000/https://murmuring-coast-74656.herokuapp.com';

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

export const HomePage = () => {
  const [index, setIndex] = React.useState(undefined);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    fetch(`${api}/categories`)
      .then(res => {
        res.json();
        console.log('res: ', res);
      })
      .then((data) => {
        setIndex({ data });
        console.log('data: ', data);
      }
        .catch(console.log);
})

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

const classes = createHomePageStyles();

return (
  <>
    {winWidth > global.maxWidth && (
      <div className={classes.body}>
        <Header />
        <Footer />
      </div>
    )}
    {winWidth <= global.maxWidth && (
      <div className={classes.body}>

      </div>
    )}
  </>
);
};
