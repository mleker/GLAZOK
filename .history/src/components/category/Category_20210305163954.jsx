import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../App';
import classNames from 'classnames';
import { Error } from '../error/Error';

const createCategoryStyles = createUseStyles(() => ({

  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  coverImage: ({ coverImage, background }) => ({
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
    overflow: 'hidden',
    position: 'absolute',
    top: 98,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: 1200,
    display: 'flex',
    fontSize: 45,
    lineHeight: 1.1,
    justifyContent: 'center',
    backgroundColor: background,
  }),

  frameWrapper: {
    width: 750,
    margin: 'auto',
    position: 'relative',
    lineHeight: 1.1,
  },

  frame: ({ coverImage }) => ({
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    background: `center / cover no-repeat url(${coverImage})`,
    border: 'solid 2px white',
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
    right: 0,
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

  textTitle: {
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
    }),
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    twoColumns: () => ({
      top: 98,
      left: 0,
      bottom: 0,
      right: 0,
      minWidth: 1200,
      display: 'flex',
      fontSize: 45,
      lineHeight: 1.1,
      justifyContent: 'center',
      backgroundColor: background,
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

export const Category = ({ post, readMode, onSetReadMode, onSetPlayMode, className }) => {
  const { theme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  // const coverImage = post && post.cover;
  const coverImage = post && (
    post.id % 2 === 0
      ? 'https://d2kq0urxkarztv.cloudfront.net/56798cfc5d4e95117dc119a0/1926507/upload-43f44c24-8d71-43e1-9905-3eb8a3b0469d.png'
      : 'https://d2kq0urxkarztv.cloudfront.net/56798cfc5d4e95117dc119a0/1896648/upload-eec7e0b6-4384-483a-8a24-acf81f6ebf7f.png'
  );

  const classes = createCategoryStyles({ coverImage, background: theme.background, color: theme.color });
  const embed_url = post && post.embed_url;

  if (!post) {
    return <Error />
  }

  return (
    readMode
      ? (
        <>
          <div className={classNames(classes.twoColumns, className)}>
            <div className={classes.firstColumn}>
              {winWidth > global.maxWidth ? post.description : post.short_description}
            </div>
            <div className={classes.secondColumn}>
              {winWidth > global.maxWidth ? post.description_en : post.short_description_en}
            </div>
          </div>
          <div className={classes.textFrameWrapper}>
            <div className={classes.textFrame}>
              <div className={classes.textFrameFirstColumn}>
                <div className={classes.textTitle}>
                  {post.title}
                </div>
                {winWidth > global.maxWidth ? post.description : post.short_description}
              </div>
              <div className={classes.textFrameSecondColumn}>
                <div className={classes.textTitle}>
                  {post.title}
                </div>
                {winWidth > global.maxWidth ? post.description_en : post.short_description_en}
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
              className={classNames(classes.rightButton, classes.playButton)}
              onClick={onSetPlayMode}
            >
              {'PLAY'}
            </div>
          </div>
        </>
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
  );
};
