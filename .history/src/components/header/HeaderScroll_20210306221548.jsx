import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';

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
    overflowX: 'auto',
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
}));

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

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderScroll = ({ categories, initialCurrentItem, onMenuClick }) => {
  const history = useHistory();
  const { theme } = React.useContext(ThemeContext);
  const [menuLeftIndent, setMenuLeftIndent] = React.useState();
  const [menuRightIndent, setMenuRightIndent] = React.useState();
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);
  const winWidth = window.innerWidth;

  const onMouseWheel = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    if (currentItem !== newCurrentItem) {
      setCurrentItem(newCurrentItem);
      history.push(categories[newCurrentItem].custom_url);
    }
  }

  React.useEffect(() => {
    window.addEventListener('mousewheel', onMouseWheel, false);
    return () => {
      window.removeEventListener('mousewheel', onMouseWheel);
    }
  })

  React.useEffect(() => {
    setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[0].offsetLeft - menuHtmlEls.current[0].offsetWidth / 2);
    setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
  }, [])

  React.useEffect(() => {
    if (initialCurrentItem >= 0) {
      menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[initialCurrentItem].offsetLeft - winWidth / 2 + menuHtmlEls.current[initialCurrentItem].offsetWidth / 2;
    }
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
        <NavLink className={classes.blinkers} to={createHomeUrl()} strict={true}>{"༗"}</Link>
        <span className={classes.bracket}>{")"}</span>
      </div>
    </div>
  );
};
