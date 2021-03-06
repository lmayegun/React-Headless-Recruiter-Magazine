import React from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

const Logo = ( {brandDescription} ) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, "items-center")}>
      <img className="logo-icon" src="/assets/images/logos/logo.png" alt="logo"/>
      { brandDescription && (
        <Typography className="text-16 ml-4 font-light logo-text" color="textPrimary">
           News & business intelligence for recruiters
        </Typography>
        )
      }
    </div>
  )
}

Logo.defaultProps = {
  brandDescription: true
}

const useStyles = makeStyles(theme=>{
  return({
    root: {
      '& .logo-icon': {
        width     : '240px',
        height    : 'auto',
        transition: theme.transitions.create(['width', 'height'], {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
        })
      },
      '& .react-badge, & .logo-text': {
        fontSize : '10px',
        color: 'white',
        padding: 4,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut
        })
      }
    },
  });
});

export default Logo;
