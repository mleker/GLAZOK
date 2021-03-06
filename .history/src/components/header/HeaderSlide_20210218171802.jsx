import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: ({ background }) => ({
        zIndex: 2,
        fontSize: 40,
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

    arrow: {
       paddingLeft: 20,
       paddingRight: 20,
    },

    cursor: ({ background }) => ({
        fontSize: 50,
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: background,
    }),

    bracket: {
        fontSize: 50,
    },

    menuItem: {
        margin: 'auto',
    }
}));

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);

    console.log(items && items[currentItem]);
    console.log(currentItem && currentItem);
    console.log(initialCurrentItem && initialCurrentItem);
    const classes = createHeaderSlideStyles({ background: theme.background, color: theme.color });
    const items = categories && categories.map(obj => obj['name']);

    return (
        <div className={classes.header}>
            <div className={classes.cursor}>
                <span className={classes.arrow}>{"<"}</span>
                <span className={classes.bracket}>{"("}</span>
                <Link
                    className={classes.blinkers}
                    to={createHomeUrl()}
                >
                    {"༗"}
                </Link>
                <span className={classes.bracket}>{")"}</span>
                <span className={classes.arrow}>{">"}</span>
            </div>
            <div className={classes.menuItem}>
                {items[currentItem]}
            </div>
        </div>
    );
};
