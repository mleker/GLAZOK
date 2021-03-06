import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from '../link/Link';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { ThemeContext } from '../../App';
import { useLocation } from 'react-router-dom';


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
  const { theme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  let location = useLocation();

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

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
          <a className={classes.item} href="/" target="blanc">{'Donate'}</a>
          <div className={classes.item}>{'Subscribe'}</div>
          <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
              <div className={classes.inputWrapper}>
                {status === "sending" && <div className={classes.loadingMsg}>{ruLang ? 'Отправляется...' : 'Sending...'}</div>}
                {status === "error" && (
                  message.includes("already subscribed")
                    ? <div className={classes.errorMsg}>{ruLang ? 'Вы уже подписались!' : 'You are already subscribed!'}</div>
                    : <div className={classes.errorMsg}>{ruLang ? 'Ошибка' : 'Error'}</div>
                )}
                {status === "success" && <div className={classes.successMsg}>{ruLang ? 'Вам было отправлено письмо для подтвеждения' : 'You’ve been sent a confirmation letter'}</div>}
                <input
                  maxLength="40"
                  onKeyUp={changeInputColor}
                  placeholder={'YOUR@E.MAIL'}
                  className={classes.input}
                  type="text"
                  value={inputValue}
                  onChange={handleChangeInputValue}
                />
                <div className={classes.submitButtonWrapper}>
                  <div
                    className={classNames(classes.submitButton, !inputValue || inputValue.indexOf("@") === -1 ? classes.disabledButton : classes.activeButton)}
                    onClick={!inputValue || inputValue.indexOf("@") === -1 ? null : () => subscribe({ EMAIL: inputValue })}
                  >
                    {'Subscribe'}
                  </div>
                </div>
              </div>
            )}
          />
          {location.pathname === createAboutUrl()
            ? (<Link className={classes.item} to={createHomeUrl()} target="blanc">{'Main'}</Link>)
            : (<Link className={classes.item} to={createAboutUrl()} target="blanc">{'About'}</Link>)
          }
        </div>
      </div>
    )
  );
};
