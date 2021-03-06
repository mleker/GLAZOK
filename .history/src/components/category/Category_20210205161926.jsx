import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPost } from '../../utils/Api';
import { ThemeContext } from '../../App';
import { themes } from '../../App';
import { navigate } from '@reach/router';

const createCategoryStyles = createUseStyles(() => ({

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
  },

  frame: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '56%',
    background: `url(https://d2kq0urxkarztv.cloudfront.net/56798cfc5d4e95117dc119a0/1926507/upload-43f44c24-8d71-43e1-9905-3eb8a3b0469d.png) center no-repeat`,
    backgroundSize: 'cover',
    border: 'solid 2px white'
  },

  rightButton: {
    fontSize: 57,
    backgroundColor: 'black',
    padding: '10px 15px 10px 15px',
    border: '2px solid white',
    right: '-152px',
    top: 0,
    position: 'absolute',
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    }
  },

  embed: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  frameCenterLink: {
    fontSize: 57,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    }
  },

  twoColumns: {
    overflow: 'hidden',
    position: 'static',
    display: 'flex',
    fontSize: 45,
    justifyContent: 'center',
  },

  firstColumn: {
    width: '50%',
    padding: 90,
    paddingRight: 120,
    wordWrap: 'break-word',
  },

  secondColumn: {
    width: '50%',
    padding: 90,
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

  [`@media (max-width: ${global.maxWidth}px)`]: {

    body: {
      width: '100%',
      margin: 0,
      color: 'white',
    },
  },
}));

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export const Category = ({ category }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [post, setPost] = React.useState();
  const [readMode, setReadMode] = React.useState(true);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  React.useEffect(() => {
    getPost(category.featuring_post_id)
      .then((data) => setPost(data))
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
            readMode
              ? (
                <div className={classes.twoColumns}>
                  <div className={classes.firstColumn}>
                    {post.description}
                  </div>
                  <div className={classes.secondColumn}>
                    {post.description_en}
                  </div>
                  <div className={classes.textFrameWrapper}>
                    <div className={classes.frame}>
                          <>
                            {true && (
                              <div
                                className={classes.frameCenterLink}
                                onClick={() => {}}
                              >
                                {'READ'}
                              </div>
                            )}
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
                            {'READ'}
                          </a>
                        )
                      }
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
              ) : (
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
                            className={classes.playLink}
                            href={post.embed_url}
                            target={'blanc'}
                          >
                            {'PLAY'}
                          </a>
                        )
                      }
                    </div>
                    <div
                      className={classes.readButton}
                      onClick={() => {
                        setReadMode(true);
                        setTheme(themes.white);
                      }}
                    >
                      {'READ'}
                    </div>
                  </div>
                </div>
              )
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
