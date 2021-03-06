import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import classNames from 'classnames';
import { navigate, useLocation } from "@reach/router";
import { getCategories } from '../../utils/Api';

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

  selectedItem: {
    opacity: 0.5,
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
      return items[i].custom_url;
    }
  }
}

const onItemFocus = (index) => {

}

const devApiUrl = 'https://murmuring-coast-74656.herokuapp.com';

// const isItemFocused

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

export const Header = () => {
  const [, updateState] = React.useState();
  const location = useLocation();
  const [categories, setCategories] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(0);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [menuLeftIndent, setMenuLeftIndent] = React.useState(0);
  const [menuRightIndent, setMenuRightIndent] = React.useState(0);
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  categories && console.log('categories: ', categories.find(item => item.custom_url = location) );
  console.log('location', location)

  const onMouseWheel = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    if (currentItem !== newCurrentItem) {
      setCurrentItem(newCurrentItem);
    }
  }

  React.useEffect(() => {
    getCategories(devApiUrl)
      .then((data) => {
        setCategories(data);
      })
      .catch(console.log);
  }, []);

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
    if (menuHtmlEls.current) {
      updateState();
    }
    if (menuHtmlEls.current[0]) {
      // console.log('currentItem', menuHtmlEls.current.find((item) => item.custom_url === currentItem));
      // console.log('currentItem', currentItem);
      setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[currentItem].offsetLeft - menuHtmlEls.current[currentItem].offsetWidth / 2);
      setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
    }
  });

  React.useEffect(() => {
    categories && navigate(categories[currentItem].custom_url);
  }, [currentItem]);

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
                className={classNames(currentItem === i && classes.selectedItem, classes.item)}
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
