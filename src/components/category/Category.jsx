import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext, themes } from '../../App';
import { apiUrl } from '../../utils/Api';
import classNames from 'classnames';
import { Error } from '../error/Error';
import { Helmet } from 'react-helmet';

const createCategoryStyles = createUseStyles(() => ({

  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  title: {
    textAlign: 'center',
    zIndex: 1,
    fontSize: 40,
    textTransform: 'uppercase',
  },

  playModeBlock: ({ background }) => ({
    backgroundColor: background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: global.minWidth,
    height: '100%',
  }),

  coverImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  readModeBlock: {
    minWidth: global.minWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },

  twoColumns: ({ background }) => ({
    position: 'fixed',
    top: 98,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: 1200,
    height: '100%',
    display: 'flex',
    fontSize: 45,
    justifyContent: 'center',
    backgroundColor: background,
  }),

  frameWrapper: {
    width: 750,
    margin: '0 auto',
    position: 'relative',
    minWidth: global.minWidth,
    marginBottom: 90,
  },

  textFrameWrapper: {
    width: 750,
    margin: '0 auto',
    position: 'relative',
    minWidth: global.minWidth,
    marginBottom: 90,
  },

  frame: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    backgroundColor: 'black',
    border: 'solid 2px white',
  },

  frameNoEmbed: {
    position: 'relative',
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
    right: -0.5,
    transform: 'translateX(calc(100% - 2px))',
    top: 0,
    position: 'absolute',
    cursor: 'pointer',
    width: 154,
    textAlign: 'center',
  }),

  playButton: {
    '&:hover, &:active': {
      color: 'rgba(0,0,0,0.5)',
    },
    cursor: 'pointer',
  },

  readButton: {
    '&:hover, &:active': {
      color: 'rgba(255,255,255,0.5)',
    },
    cursor: 'pointer',
  },

  frameCenterLink: ({ color }) => ({
    fontSize: 57,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translate(-50%)',
    color: color,
    '&:hover, &:active': {
      opacity: 0.5,
    },
    cursor: 'pointer',
  }),

  firstColumn: {
    width: '50%',
    padding: 80,
    paddingTop: 50,
    paddingRight: 120,
    wordWrap: 'break-word',
  },

  postTitle: {
    textTransform: 'uppercase',
    paddingBottom: 5,
  },

  secondColumn: {
    width: '50%',
    padding: 80,
    paddingTop: 50,
    paddingLeft: 120,
    wordWrap: 'break-word',
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

  textFrameTitle: {
    textTransform: 'uppercase',
    paddingBottom: 5,
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

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  },

  [`@media (max-width: 1055px)`]: {
    rightButton: () => ({
      transform: 'translateY(calc(100% - 2px))',
      bottom: 0,
      top: 'auto',
      right: 0,
    }),

    frameWrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
    },

    textFrameWrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
    },
  },

  [`@media (max-width: 752px)`]: {
    frameWrapper: {
      width: '100%',
    }
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    playModeBlock: () => ({
      position: 'absolute',
      left: 0,
      right: 0,
    }),

    twoColumns: () => ({
      top: 140,
    }),

    frameCenterLink: () => ({
      fontSize: 40,
      '&:hover, &:active': {
        opacity: 1,
      },
    }),

    rightButton: () => ({
      fontSize: 40,
      transform: 'translateY(calc(100% - 2px))',
      bottom: 0,
      top: 'auto',
      padding: '20px 25px 15px 25px',
      width: 138,
    }),

    playButton: {
      '&:hover, &:active': {
        color: 'inherit',
      },
    },

    readButton: {
      '&:hover, &:active': {
        color: 'inherit',
      },
    },

    firstColumn: {
      padding: 40,
    },

    secondColumn: {
      padding: 40,
    },

    frameWrapper: {
      left: 0,
      right: 0,
      top: '53%',
      width: '100%',
      transform: 'translateY(-50%) translateX(0)',
    },

    textFrameWrapper: {
      left: 0,
      right: 0,
      width: '100%',
      transform: 'translateY(-50%) translateX(0)',
    },

    textFrameFirstColumn: {
      padding: '10px 40px 10px 15px',
      fontSize: 16,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 40px',
      fontSize: 16,
    },

  },
}));

export const Category = ({ category, post, readMode, onSetReadMode, onSetPlayMode }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  React.useEffect(() => {
    if (readMode) {
      setTheme(themes.white);
    } else {
      setTheme(themes.black);
    }
  }, [])

  const coverImage = post && post.cover;
  const title = post && post.title;
  const description = post && post.about;
  const shareImage = post && apiUrl + post.about_cover;
  const classes = createCategoryStyles({ background: theme.background, color: theme.color });
  const embed_url = post && post.embed_url;
  const external_url = post && post.external_url;

  if (!post) {
    return <Error />
  }

  return (
    <>
      <Helmet>
        <meta property="og:type" content="site" />
        <meta property="og:title" content="glazok.tv" />
        <meta property="og:description" content="GLAZOK (༗) is an unstable video platform for films, lectures, and live-feeds." />
        <meta property="og:image" content="https://glazok.tv/share-fb.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="glazok.tv" />
        <meta name="twitter:description" content="GLAZOK (༗) is an unstable video platform for films, lectures, and live-feeds." />
        <meta name="twitter:image" content="https://glazok.tv/share-fb.jpg" />
      </Helmet>
      {winWidth <= global.maxWidth && (
        <div className={classes.title}>
          {category.name}
        </div>
      )}
      {readMode
        ? (
          <div className={classes.readModeBlock}>
            <div className={classes.twoColumns}>
              <div className={classes.firstColumn}>
                <div className={classes.postTitle}>
                  {post.title}
                </div>
                {winWidth > global.maxWidth ? post.description : post.short_description}
              </div>
              <div className={classes.secondColumn}>
                <div className={classes.postTitle}>
                  {post.title}
                </div>
                {winWidth > global.maxWidth ? post.description_en : post.short_description_en}
              </div>
            </div>
            <div className={classes.textFrameWrapper}>
              <div className={classes.textFrame}>
                <div className={classes.textFrameFirstColumn}>
                  {winWidth > global.maxWidth && (
                    <div className={classes.textFrameTitle}>
                      {post.title}
                    </div>
                  )}
                  {winWidth > global.maxWidth ? post.description : post.short_description}
                </div>
                <div className={classes.textFrameSecondColumn}>
                  {winWidth > global.maxWidth && (
                    <div className={classes.textFrameTitle}>
                      {post.title}
                    </div>
                  )}
                  {winWidth > global.maxWidth ? post.description_en : post.short_description_en}
                </div>
                {external_url && (
                  <a
                    className={classes.frameCenterLink}
                    href={external_url}
                    target='blanc'
                  >
                    {'READ'}
                  </a>
                )}
              </div>
              <div
                className={classNames(classes.rightButton, classes.playButton)}
                onClick={onSetPlayMode}
              >
                {'PLAY'}
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.playModeBlock}>
            <img
              className={classes.coverImage}
              src={apiUrl + coverImage}
            />
            <div className={classes.frameWrapper}>
              <div className={classNames(classes.frame, !embedShowed && classes.frameNoEmbed)}>
                {embed_url.includes('youtube.com/embed') || embed_url.includes('player.vimeo.com')
                  ? (
                    <>
                      {embedShowed
                        ? (
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
                        )
                        : (
                          <>
                            <img
                              className={classes.coverImage}
                              src={apiUrl + coverImage}
                            />
                            <div
                              className={classes.frameCenterLink}
                              onClick={setEmbedShowed}
                            >
                              {'PLAY'}
                            </div>
                          </>
                        )
                      }
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
                className={classNames(classes.rightButton, classes.readButton)}
                onClick={onSetReadMode}
              >
                {'READ'}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
};
