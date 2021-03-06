import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from '../link/Link';
import { createAboutUrl } from '../../utils/AppUrlCreators';

const createFooterStyles = createUseStyles(() => ({
  footer: ({ color }) => ({
    fontSize: 20,
    position: 'absolute',
    bottom: 35,
    left: '50%',
    transform: 'translate(-50%)',
    width: 300,
    color: color,
  }),

  row: {
    textAlign: 'center',
    paddingBottom: 5,
  },

  item: {
    display: 'inline-block',
    paddingLeft: 15,
    paddingRight: 15,
  }
}));

const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export const Footer = () => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  const classes = createFooterStyles({theme.color});

  return (
    <>
      {winWidth > global.maxWidth && (
        <div className={classes.footer}>
          <div className={classes.row}>
            <a className={classes.item} href="/" target="blanc">Fb</a>
            <a className={classes.item} href="/" target="blanc">In</a>
            <a className={classes.item} href="/" target="blanc">Vk</a>
          </div>
          <div className={classes.row}>
            <a className={classes.item} href="/" target="blanc">{'Donate'}</a>
            <div className={classes.item}>{'Subscribe'}</div>
            <Link className={classes.item} to={createAboutUrl()} target="blanc">{'About'}</Link>
          </div>
        </div>
      )}
    </>
  );
};
