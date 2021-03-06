import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPost } from '../../utils/Api';
import { Link } from '../link/Link';

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
    position: 'relative',
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

  readButton: {
    fontSize: 57,
    padding: 10,
    border: '2px solid white',
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

  playLink: {
    fontSize: 57,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    '&:hover, &:active': {
      opacity: 0.5,
    }
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

export const getHostName = (url) => {
  let hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

export const getRootDomain = (url) => {
  let domain = getHostName(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }
  return domain;
}

export const Category = ({ category }) => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [post, setPost] = React.useState();
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
      .catch(console.log);
  }, []);

  const cover = post && post.cover;
  const classes = createCategoryStyles({ cover });
  const embed_url = post && post.embed_url;
  post && console.log('url', post.embed_url);

  return (
    <>
      {category && post && winWidth > global.maxWidth && (
        <div className={classes.coverImage}>
          <div className={classes.frameWrapper}>
            <div className={classes.frame}>
              {embed_url.includes('youtube.com/embed') || embed_url.includes('player.vimeo.com')
                ? (
                  <>
                    <div
                      className={classes.playLink}
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
              onClick={setReadMode}
            >
              {'READ'}
            </div>
          </div>
        </div>
      )}
      {category && winWidth <= global.maxWidth && (
        <div className={classes.coverImage}>
          {category.name}
        </div>
      )}
    </>
  );
};
