import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPost } from '../../utils/Api';
import { ThemeContext } from '../../App';
import { themes } from '../../App';
import { CSSTransition, Transition } from 'react-transition-group';

const startFadeStyles = {
  opacity: 0,
  visibility: 'hidden',
};

const finishfadeStyles = {
  opacity: 1,
  visibility: 'visible',
};

const createCategoryStyles = createUseStyles(() => ({

  fadeEnter: {
    ...startFadeStyles,
  },
  fadeEnterActive: {
    ...finishfadeStyles,
    transition: 'all 400ms ease-in',
  },
  fadeExit: {
    ...finishfadeStyles,
  },
  fadeExitActive: {
    ...startFadeStyles,
    transition: 'all 400ms ease-in',
  },

  coverImage: ({ coverImage }) => ({
    background: `url(https://d2kq0urxkarztv.cloudfront.net/56798cfc5d4e95117dc119a0/1926507/upload-43f44c24-8d71-43e1-9905-3eb8a3b0469d.png) center no-repeat fixed`,
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  }),

  frameWrapper: {
    width: 750,
    margin: 'auto',
    position: 'relative',
  },

  frame: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    background: `url(https://d2kq0urxkarztv.cloudfront.net/56798cfc5d4e95117dc119a0/1926507/upload-43f44c24-8d71-43e1-9905-3eb8a3b0469d.png) center no-repeat`,
    backgroundSize: 'cover',
    border: 'solid 2px white'
  },

  embed: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  rightButton: ({ background, color }) => ({
    fontSize: 57,
    backgroundColor: background,
    color: color,
    padding: '10px 15px 10px 15px',
    border: `2px solid ${color}`,
    right: 0,
    transform: 'translateX(calc(100% - 2px))',
    top: 0,
    position: 'absolute',
    cursor: 'pointer',
    '&:hover, &:active': {
      color: 'rgba(0,0,0,0.5)',
    }
  }),

  frameCenterLink: ({ color }) => ({
    fontSize: 57,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translate(-50%)',
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    },
    color: color,
  }),

  twoColumns: {
    overflow: 'hidden',
    position: 'static',
    display: 'flex',
    fontSize: 45,
    justifyContent: 'center',
  },

  firstColumn: {
    width: '50%',
    padding: 80,
    paddingRight: 120,
    wordWrap: 'break-word',
  },

  secondColumn: {
    width: '50%',
    padding: 80,
    paddingLeft: 120,
    wordWrap: 'break-word',
  },

  textFrameWrapper: {
    position: 'absolute',
    width: 750,
    margin: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  textFrame: {
    position: 'relative',
    display: 'flex',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    backgroundColor: 'white',
    border: 'solid 2px black',
  },

  textFrameFirstColumn: {
    width: '50%',
    fontSize: 20,
    padding: '45px 70px 20px 20px',
    wordWrap: 'break-word',
  },

  textFrameSecondColumn: {
    width: '50%',
    fontSize: 20,
    padding: '45px 20px 20px 70px',
    wordWrap: 'break-word',
  },



  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {
      width: '100%',
      margin: 0,
      color: 'white',
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

const useDelayUnmount = (isMounted, delayTime: number) => {
  const [ shouldRender, setShouldRender ] = useState(false);

  useEffect(() => {
      let timeoutId: number;
      if (isMounted && !shouldRender) {
          setShouldRender(true);
      }
      else if(!isMounted && shouldRender) {
          timeoutId = setTimeout(
              () => setShouldRender(false), 
              delayTime
          );
      }
      return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

export const Category = ({ category }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [post, setPost] = React.useState();
  const [dataReady, setDataReady] = React.useState(false);
  const [readMode, setReadMode] = React.useState(false);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  React.useEffect(() => {
    getPost(category.featuring_post_id)
      .then((data) => setPost(data))
      .then(setDataReady(true))
      .then(console.log('data ready'))
      .catch(console.log);
    return () => setTheme(themes.black);;
  }, []);

  const cover = post && post.cover;
  const classes = createCategoryStyles({ cover, background: theme.background, color: theme.color });
  const embed_url = post && post.embed_url;

  return (
    <ThemeContext.Consumer>
      {({ setTheme }) => (
        <>
          {category && post && winWidth > global.maxWidth && (
            <>
              
                <CSSTransition
                  in={readMode}
                  timeout={400}
                  classNames="fade"
                  unmountOnExit
                  classNames={{
                    enter: classes.fadeEnter,
                    enterActive: classes.fadeEnterActive,
                    exit: classes.fadeExit,
                    exitActive: classes.fadeExitActive,
                  }}
                >
                  <div className={classes.twoColumns}>
                    <div className={classes.firstColumn}>
                      {post.description}
                    </div>
                    <div className={classes.secondColumn}>
                      {post.description_en}
                    </div>
                    <div className={classes.textFrameWrapper}>
                      <div className={classes.textFrame}>
                        <div className={classes.textFrameFirstColumn}>
                          {post.description}
                        </div>
                        <div className={classes.textFrameSecondColumn}>
                          {post.description_en}
                        </div>
                        {true && (
                          <a
                            className={classes.frameCenterLink}
                            href={'/'}
                            target={'blanc'}
                          >
                            {'READ'}
                          </a>
                        )}
                      </div>
                      <div
                        className={classes.rightButton}
                        onClick={() => {
                          setReadMode(false);
                          setTheme(themes.black);
                        }}
                      >
                        {'PLAY'}
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              
              
                <CSSTransition
                  in={!readMode}
                  timeout={400}
                  classNames="fade"
                  unmountOnExit
                  classNames={{
                    enter: classes.fadeEnter,
                    enterActive: classes.fadeEnterActive,
                    exit: classes.fadeExit,
                    exitActive: classes.fadeExitActive,
                  }}
                >
                  <div className={classes.coverImage}>
                    <div className={classes.frameWrapper}>
                      <div className={classes.frame}>
                        {embed_url.includes('youtube.com/embed') || embed_url.includes('player.vimeo.com')
                          ? (
                            <>
                              <div
                                className={classes.frameCenterLink}
                                onClick={setEmbedShowed}
                              >
                                {'PLAY'}
                              </div>
                              {embedShowed && (
                                <iframe
                                  className={classes.embed}
                                  src={`${post.embed_url}?autoplay=1`}
                                  frameBorder='0'
                                  allow={embed_url.includes('player.vimeo.com')
                                    ? "autoplay; fullscreen; picture-in-picture"
                                    : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  }
                                  allowFullScreen='1'
                                  webkitallowfullscreen='1'
                                  mozallowfullscreen='1'
                                />
                              )}
                            </>
                          )
                          : (
                            <a
                              className={classes.frameCenterLink}
                              href={post.embed_url}
                              target={'blanc'}
                            >
                              {'PLAY'}
                            </a>
                          )
                        }
                      </div>
                      <div
                        className={classes.rightButton}
                        onClick={() => {
                          setReadMode(true);
                          setTheme(themes.white);
                        }}
                      >
                        {'READ'}
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              
            </>
          )}
          {category && winWidth <= global.maxWidth && (
            <div className={classes.coverImage}>
              {category.name}
            </div>
          )}
        </>
      )}
    </ThemeContext.Consumer>
  );
};
