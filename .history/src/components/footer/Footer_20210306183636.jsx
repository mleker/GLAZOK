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
    position: 'absolute',
    bottom: 35,
    left: '50%',
    transform: 'translate(-50%)',
    width: 300,
    color: color,
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
    '&:hover, &:active': {
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
    borderBottom: '2px solid white',
    marginRight: 20,
    width: 200,
    color: color,
  }),

  submitButton: {

  },

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
  const { theme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [inputValue, setInputValue] = React.useState('');
  const [inputVisible, setInputVisible] = React.useState(false);
  const classes = createFooterStyles({ color: theme.color, background: theme.background });
  let location = useLocation();

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  const handleChangeInputValue = (event) => setInputValue(event.target.value);


  return (
    winWidth > global.maxWidth && (
      <div className={classes.footer}>
        <div className={classes.row}>
          <a className={classes.item} href="/" target="blanc">Fb</a>
          <a className={classes.item} href="/" target="blanc">In</a>
          <a className={classes.item} href="/" target="blanc">Vk</a>
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
              url={mailchimp_url}
              render={({ subscribe, status, message }) => (
                <div className={classes.inputWrapper}>
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
                    onClick={() => subscribe({ EMAIL: inputValue })}
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
              ? (<Link className={classes.item} to={createHomeUrl()} target="blanc">{'Main'}</Link>)
              : (<Link className={classes.item} to={createAboutUrl()} target="blanc">{'About'}</Link>)
          )}

        </div>
      </div>
    )
  );
};
