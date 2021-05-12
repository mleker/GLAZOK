import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from '../link/Link';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { ThemeContext, mailchimpUrl } from '../../App';
import { useLocation } from 'react-router-dom';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import classNames from 'classnames';

const createFooterStyles = createUseStyles(() => ({
  footer: ({ color }) => ({
    fontSize: 20,
    paddingBottom: 30,
    left: '50%',
    bottom: 0,
    margin: '0 auto',
    width: 300,
    color: color,
    zIndex: 10,
  }),

  row: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 5,
  },

  item: {
    display: 'inline-block',
    paddingLeft: 15,
    paddingRight: 15,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5,
    },
    borderBottom: `2px solid transparent`,
  },

  inputWrapper: {
    display: 'flex',
    position: 'relative',
  },

  input: ({ color }) => ({
    paddingLeft: 15,
    borderBottom: `2px solid ${color}`,
    marginRight: 20,
    width: 200,
    color: color,
  }),

  disabledButton: {
    opacity: 0.5,
  },

  activeButton: {
    cursor: 'pointer',
  },

  inputMsg: {
    top: 35,
    left: 0,
    position: 'absolute',
    fontSize: 12,
    paddingBottom: 10,
  },

  errorMsg: {
    extend: 'inputMsg',
    color: '#ff0000',
  },

  loadingMsg: ({ color }) => ({
    extend: 'inputMsg',
    color: color,
  }),

  successMsg: {
    extend: 'inputMsg',
    color: 'green',
  },

  staticFooter: {
    position: 'static',
    transform: 'none',
  },

  absoluteFooter: {
    position: 'absolute',
    transform: 'translate(-50%)',
  },

  [`@media (max-height: ${global.maxHeight}px)`]: {
    footer: () => ({
      fontSize: 12,
      paddingBottom: 5,
    }),
  },
}));

export const Footer = ({positionStatic = false}) => {
  const { theme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);
  const [inputValue, setInputValue] = React.useState('');
  const [inputVisible, setInputVisible] = React.useState(false);
  const inputWrapperHtmlEl = React.useRef();
  const classes = createFooterStyles({ color: theme.color, background: theme.background });
  let location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    }
  })

  const handleChangeInputValue = (event) => setInputValue(event.target.value);
  const handleClick = (event) => inputVisible && !inputWrapperHtmlEl.current.contains(event.target) && setInputVisible(false);

  return (
    (winWidth > global.width3 || winHeight < global.height1) && (
      <div className={classNames(classes.footer, positionStatic ? classes.staticFooter : classes.absoluteFooter)}>
        <div className={classes.row}>
          <a
            className={classes.item}
            href="https://www.facebook.com/glazok.tv"
            target="blanc"
          >
            {'Fb'}
          </a>
          <a
            className={classes.item}
            href="https://www.instagram.com/glazok.me"
            target="blanc">
            {'In'}
          </a>
          <a
            className={classes.item}
            href="https://www.youtube.com/channel/UClbQ_fo9S2UrHKkGuqpShBw"
            target="blanc"
          >
            {'Yt'}
          </a>
        </div>
        <div className={classes.row}>

          <div
            className={classes.item}
            onClick={() => setInputVisible(!inputVisible)}
          >
            {'Subscribe'}
          </div>

          {inputVisible && (
            <MailchimpSubscribe
              url={mailchimpUrl}
              render={({ subscribe, status, message }) => (
                <div
                  ref={inputWrapperHtmlEl}
                  className={classes.inputWrapper}
                >
                  <input
                    maxLength="40"
                    placeholder={'Your@e.mail'}
                    className={classes.input}
                    type="text"
                    value={inputValue}
                    onChange={handleChangeInputValue}
                  />
                  <div
                    className={classNames(classes.submitButton, !inputValue || inputValue.indexOf("@") === -1 ? classes.disabledButton : classes.activeButton)}
                    onClick={() => {
                      inputValue && inputValue.indexOf("@") !== -1 && subscribe({ EMAIL: inputValue })
                    }}
                  >
                    {'>'}
                  </div>
                  {status === "sending" && <div className={classes.loadingMsg}>{'Sending...'}</div>}
                  {status === "error" && (
                    message.includes("already subscribed")
                      ? <div className={classes.errorMsg}>{'You are already subscribed!'}</div>
                      : <div className={classes.errorMsg}>{'Error'}</div>
                  )}
                  {status === "success" && <div className={classes.successMsg}>{'You’ve been sent a confirmation letter'}</div>}
                </div>
              )}
            />
          )}

          {!inputVisible && (
            <a
              className={classes.item}
              href="https://www.buymeacoffee.com/glazok"
              target="blanc"
            >
              {'Donate'}
            </a>
          )}

          {!inputVisible && (
            location.pathname === createAboutUrl()
              ? (<Link className={classes.item} to={createHomeUrl()}>{'Main'}</Link>)
              : (<Link className={classes.item} to={createAboutUrl()}>{'About'}</Link>)
          )}

        </div>
      </div>
    )
  );
};
