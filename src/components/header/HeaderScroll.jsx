import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { replaceSpacesWithUnderscore } from '../../utils/UtilFuncs';

const createHeaderScrollStyles = createUseStyles(() => ({

  header: ({ background }) => ({
    zIndex: 2,
    fontSize: 57,
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 10,
    flexShrink: 0,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    backgroundColor: background,
  }),

  div1: ({ menuLeftIndent }) => ({
    width: menuLeftIndent,
    display: 'inline-block',
  }),

  div2: ({ menuRightIndent }) => ({
    width: menuRightIndent,
    display: 'inline-block',
  }),

  cursor: ({ background }) => ({
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: background,
  }),

  bracket: {
    fontSize: 50,
  },

  item: {
    marginRight: 30,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5,
    }
  },

  blinkers: {
    animationName: '$blinker',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'steps(2, start)',
  },

  '@keyframes blinker': {
    to: { visibility: 'hidden' },
  },

  [`@media (max-height: ${global.maxHeight}px)`]: {

    header: () => ({
      fontSize: 33,
      paddingTop: 10,
      paddingBottom: 5,
    }),

    cursor: () => ({
      top: 10,
    }),

    bracket: {
      fontSize: 30,
    },
  },

  [`@media (max-height: ${global.height2}px)`]: {
    item: {
      '&:hover': {
        opacity: 1,
      }
    },
  }
}));

const scrollHorizontally = (e, itemsWrapper) => {
  if (e.wheelDeltaY > 9 || e.wheelDeltaY < -9) {
    const delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
    itemsWrapper.scrollLeft -= delta * 5;
  }
}

const getCurrentItem = (items, winCenter) => {
  for (let i = 0; i < Object.keys(items).length; i++) {
    const rect = items[i].getBoundingClientRect();
    if (rect.x <= winCenter + 15 && rect.x >= winCenter - rect.width - 15) {
      return i;
    }
  }
}

export const HeaderScroll = ({ categories, initialCurrentItem, onMenuClick }) => {
  const history = useHistory();
  const { theme } = React.useContext(ThemeContext);
  const [menuLeftIndent, setMenuLeftIndent] = React.useState(0);
  const [menuRightIndent, setMenuRightIndent] = React.useState(0);
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);

  const handleScroll = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    if (currentItem !== newCurrentItem) {
      setCurrentItem(newCurrentItem);
      history.push(categories[newCurrentItem].custom_url);
    }
  }

  React.useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('touchmove', handleScroll, false);
    window.addEventListener('mousewheel', handleScroll, false);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
    }
  })

  React.useEffect(() => {
    console.log('menuHtmlEls.current[initialCurrentItem].offsetLeft', menuHtmlEls.current[initialCurrentItem].offsetLeft);
    console.log('menuHtmlEls.current[0].offsetWidth', menuHtmlEls.current[0].offsetWidth);
    setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[0].offsetWidth / 2);
    setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
    menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[currentItem].offsetLeft + menuHtmlEls.current[currentItem].offsetWidth / 2 - winWidth / 2;
  }, [winWidth, winHeight])

  React.useEffect(() => {
    setCurrentItem(initialCurrentItem);
    menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[initialCurrentItem].offsetLeft + menuHtmlEls.current[initialCurrentItem].offsetWidth / 2 - winWidth / 2;
  }, [initialCurrentItem])

  const classes = createHeaderScrollStyles({ menuLeftIndent, menuRightIndent, background: theme.background, color: theme.color });
  const items = categories && categories.map(obj => obj['name']);

  return (
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
            onClick={() => {
              onMenuClick(i);
              history.push(categories[i].custom_url);
            }}
            className={classes.item}
          >
            {replaceSpacesWithUnderscore(item)}
          </span>
        ))}
        <div className={classes.div2} />
      </div>
      <div className={classes.cursor}>
        <span className={classes.bracket}>{"("}</span>
        <span className={classes.blinkers}>{'\u0F17'}</span>
        <span className={classes.bracket}>{")"}</span>
      </div>
    </div>
  );
};
