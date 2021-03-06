import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { getCategories } from '../../utils/Api'

const createHeaderStyles = createUseStyles(() => ({

  div1: ({ menuLeftIndent }) => ({
    width: menuLeftIndent,
    display: 'inline-block',
  }),

  div2: ({ menuRightIndent }) => ({
    width: menuRightIndent,
    display: 'inline-block',
  }),

  header: {
    fontSize: 57,
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  cursor: {
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'black',
  },

  bracket: {
    fontSize: 50,
  },

  eye: {

  },

  item: {
    marginRight: 30,
  },

  blinkers: {
    animation: '$blinker 1s steps(2, jump-none) infinite',

  },

  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    header: {
      fontSize: 30,
      width: '100%',
      margin: 0,
    },
  },
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

const scrollHorizontally = (e, htmlEl) => {
  var delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
  htmlEl.scrollLeft -= delta * 100;
  console.log("e.detail: ", e.detail);
  console.log("e.wheelDelta: ", e.wheelDeltaY);
  console.log('e', e);
}

const scroll = () => {
  console.log('scroll');
}

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

const devApiUrl = 'https://murmuring-coast-74656.herokuapp.com';

export const Header = () => {
  const [, updateState] = React.useState();
  const [index, setIndex] = React.useState(null);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [menuLeftIndent, setMenuLeftIndent] = React.useState(0);
  const [menuRightIndent, setMenuRightIndent] = React.useState(0);
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  console.log(menuWrapperHtmlEl.current);

  React.useEffect(() => {
    getCategories(devApiUrl)
      .then((data) => {
        setIndex(data);
      })
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  React.useEffect(() => {
    window.addEventListener('mousewheel', () => scrollHorizontally(menuWrapperHtmlEl.current), false);
    window.addEventListener('onkeydown', () => scrollHorizontally(menuWrapperHtmlEl.current), false);
    window.addEventListener('DOMMouseScroll', () => scrollHorizontally(menuWrapperHtmlEl.current), false);
    return () => {
      window.removeEventListener('mousewheel', scrollHorizontally);
      window.removeEventListener('DOMMouseScroll', scrollHorizontally);
    }
  })

  React.useEffect(() => {
    if (menuHtmlEls.current) {
      updateState();
    }
    if (menuHtmlEls.current[0]) {
      setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[0].offsetWidth / 2);
      setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
    }
  });

  const classes = createHeaderStyles({ menuLeftIndent, menuRightIndent });
  const headerItems = index && index.map(obj => obj['name']);

  return (
    <>
      {winWidth > global.maxWidth && (
        <div
          ref={menuWrapperHtmlEl}
          className={classes.header}
        >
          <div className={classes.items}>
            <div className={classes.div1} />
            {headerItems && headerItems.map((item, i) => (
              <span
                key={i}
                ref={(el) => menuHtmlEls.current[i] = el}
                className={classes.item}
              >
                {replaceSpacesWithBallotBox(item)}
              </span>
            ))}
            <div className={classes.div2} />
          </div>
          <div className={classes.cursor}>
            <span className={classes.bracket}>{"("}</span>
            <Link
              className={classes.blinkers}
              to={createHomeUrl()}
            >
              {"༗"}
            </Link>
            <span className={classes.bracket}>{")"}</span>
          </div>
        </div>
      )}
      {winWidth <= global.maxWidth && (
        <div className={classes.header}>

        </div>
      )}
    </>
  );
};
