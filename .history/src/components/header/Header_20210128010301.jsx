import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { navigate } from "@reach/router";

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
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    }
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

const scrollHorizontally = (e, itemsWrapper) => {
  // e.preventDefault();
  const delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
  itemsWrapper.scrollLeft -= delta * 5;
}

const getCurrentItem = (items, winCenter) => {
  for (let i = 0; i < Object.keys(items).length; i++) {
    const rect = items[i].getBoundingClientRect();
    if (rect.x <= winCenter + 15 && rect.x >= winCenter - rect.width - 15) {
      return i;
    }
  }
}

const onItemFocus = (index) => {

}

// const isItemFocused

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

export const Header = ({categories, currentItem}) => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const menuLeftIndent; menuRightIndent;
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();

  const onMouseWheel = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    console.log('newCurrentItem', newCurrentItem);
    if (currentItem !== newCurrentItem) {
      // setCurrentItem(newCurrentItem);
      navigate(categories[newCurrentItem].custom_url, { replace: true })
    }
  }

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  React.useEffect(() => {
    window.addEventListener('mousewheel', onMouseWheel, false);
    // window.addEventListener('DOMMouseScroll', (e) => scrollHorizontally(e, menuWrapperHtmlEl.current), false);
    return () => {
      window.removeEventListener('mousewheel', onMouseWheel);
      // window.removeEventListener('DOMMouseScroll', scrollHorizontally);
    }
  })

  React.useEffect(() => {
    console.log('indents');
    if (menuHtmlEls.current[currentItem]) {
      menuLeftIndent = winWidth / 2 - menuHtmlEls.current[0].offsetLeft - menuHtmlEls.current[0].offsetWidth / 2;
      menuRightIndent = winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30;
      menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[currentItem].offsetLeft - winWidth / 2 + menuHtmlEls.current[currentItem].offsetWidth / 2;
    }
  });

  const classes = createHeaderStyles({ menuLeftIndent, menuRightIndent });
  const items = categories && categories.map(obj => obj['name']);

  return (
    <>
      {winWidth > global.maxWidth && (
        <div
          ref={menuWrapperHtmlEl}
          className={classes.header}
        >
          <div className={classes.items}>
            <div className={classes.div1} />
            {items && items.map((item, i) => (
              <span
                key={i}
                ref={(el) => menuHtmlEls.current[i] = el}
                onClick={() => navigate(categories[i].custom_url)}
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
