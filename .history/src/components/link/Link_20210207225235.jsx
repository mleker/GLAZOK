import React from 'react';
import {Link as Link0} from '@reach/router';
import {createUseStyles} from 'react-jss';
import classNames from 'classnames';

const createLinkClasses = createUseStyles({
  link: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5,
    },
  },
});

export const Link = ({children, to, className, ...props}) => {
  const classes = createLinkClasses();

  return (
      <Link0
      {...props
          className={classNames(classes.link, className)}
          to={to}
      >
        {children}
      </Link0>
  )
};
