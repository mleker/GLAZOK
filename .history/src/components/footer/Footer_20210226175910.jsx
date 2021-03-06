import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from '../link/Link';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { ThemeContext } from '../../App';
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
    textAlign: 'center',
    paddingBottom: 5,
  },

  item: {
    display: 'inline-block',
    paddingLeft: 15,
    paddingRight: 15,
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    }
  },

  subscribeWrapper: {
    display: 'flex',
  },

  inputWrapper: {
    display: 'flex',
  },

  input: ({color}) => ({
    borderBottom: '2px solid white',
    marginRight: 20,
    width: 200,
    color: color,
  }),

  submitButton: {
    fontSize: 30,
  },

  disabledButton: {
    opacity: 0.5,
  },

  activeButton: {
    cursor: 'pointer',
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
  const { theme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [inputValue, setInputValue] = React.useState('');
  const [inputVisible, setInputVisible] = React.useState(true);

  let location = useLocation();
  const url = '//gmail.us10.list-manage.com/subscribe/post?u=d85f58b233c0f486796471e30&id=6066ed83ae';

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  const handleChangeInputValue = (event) => setInputValue(event.target.value);

  const classes = createFooterStyles({ color: theme.color });

  return (
    winWidth > global.maxWidth && (
      <div className={classes.footer}>
        <div className={classes.row}>
          <a className={classes.item} href="/" target="blanc">Fb</a>
          <a className={classes.item} href="/" target="blanc">In</a>
          <a className={classes.item} href="/" target="blanc">Vk</a>
        </div>
        <div className={classes.row}>
          {!inputVisible && (
            <a className={classes.item} href="/" target="blanc">{'Donate'}</a>
          )}
          <div className={inputVisible ? classes.subscribeWrapper : classes.item}>
            <div
              className={classes.subscribeHandler}
              onClick={setInputVisible}
            >
              {'Subscribe'}
            </div>
            {inputVisible && (
              <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                  <div className={classes.inputWrapper}>
                    <input
                      maxLength="40"
                      placeholder={'Your@e.MAIL'}
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
                  </div>
                )}
              />
            )}
          </div>
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

{/* {status === "sending" && <div className={classes.loadingMsg}>{ruLang ? 'Отправляется...' : 'Sending...'}</div>}
                  {status === "error" && (
                    message.includes("already subscribed")
                      ? <div className={classes.errorMsg}>{ruLang ? 'Вы уже подписались!' : 'You are already subscribed!'}</div>
                      : <div className={classes.errorMsg}>{ruLang ? 'Ошибка' : 'Error'}</div>
                  )}
                  {status === "success" && <div className={classes.successMsg}>{ruLang ? 'Вам было отправлено письмо для подтвеждения' : 'You’ve been sent a confirmation letter'}</div>} */}

