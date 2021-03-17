import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext, themes } from '../../App';
import { apiUrl } from '../../utils/Api';
import { debounce } from '../../utils/UtilFuncs';
import classNames from 'classnames';
import { Error } from '../error/Error';

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

  playModeBlock: ({ coverImage, background }) => ({
    background: `center / cover no-repeat url(${coverImage})`,
    backgroundColor: background,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    // animation: '$fadeIn 300ms',
  }),

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
    // lineHeight: 1.1,
    justifyContent: 'center',
    backgroundColor: background,
  }),

  frameWrapper: {
    width: 750,
    margin: 'auto',
    position: 'relative',
    // lineHeight: 1.1,
  },

  frame: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    backgroundColor: 'black',
    border: 'solid 2px white',
  },

  frameNoEmbed: ({ coverImage }) => ({
    background: `center / cover no-repeat url(${coverImage})`,
  }),

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
    paddingLeft: 120,
    wordWrap: 'break-word',
  },

  textFrameWrapper: {
    position: 'absolute',
    width: 750,
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
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
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    twoColumns: () => ({
      top: 140,
    }),

    frameCenterLink: () => ({
      fontSize: 40,
    }),

    rightButton: () => ({
      fontSize: 40,
      transform: 'translateY(calc(100% - 2px))',
      bottom: 0,
      top: 'auto',
      padding: '20px 25px 15px 25px',
    }),

    firstColumn: {
      padding: 40,
    },

    secondColumn: {
      padding: 40,
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

export const Category = React.forwardRef(({ category, post, readMode, onSetReadMode, onSetPlayMode }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  React.useEffect(() => {
    if (readMode) {
      setTheme(themes.white);
    } else {
      setTheme(themes.black);
    }
  }, [])

  const coverImage = post && post.cover;
  const classes = createCategoryStyles({ coverImage: apiUrl + coverImage, background: theme.background, color: theme.color });
  const embed_url = post && post.embed_url;
  const external_url = post && post.external_url;

  if (!post) {
    return <Error />
  }

  return (
    <>
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
                  <div className={classes.textFrameTitle}>
                    {post.title}
                  </div>
                  {winWidth > global.maxWidth ? post.description : post.short_description}
                </div>
                <div className={classes.textFrameSecondColumn}>
                  <div className={classes.textFrameTitle}>
                    {post.title}
                  </div>
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
                          <div
                            className={classes.frameCenterLink}
                            onClick={setEmbedShowed}
                          >
                            {'PLAY'}
                          </div>
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
  );
});
