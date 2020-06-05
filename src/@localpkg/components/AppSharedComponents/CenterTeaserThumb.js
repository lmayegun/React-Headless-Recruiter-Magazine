import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Typography} from '@material-ui/core';
import {withRouter, Link} from 'react-router-dom';
import clsx from 'clsx';

import {AppPremIcon} from './AppPremIcon';
import {AppTags} from './AppTags';

function CenterTeaserThumb({content, type}){

  const centerThumbStyles = makeStyles(theme => ({
      root:{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 0,
        marginBottom: 50,
      },

      thumbImg:{
        width: '100%',
        position: 'relative',
        marginBottom: '0px',
        overflow: 'hidden',
      },
      image:{
        cursor: 'pointer',
        width: '100%',
        '&:hover':{
            transform: 'scale(1.2)',
            transition: 'all .4s',
          }
      },
      thumbContent:{
        width: '100%',
        textAlign: 'center',
      },
      title:{
        color: '#4d4d4f !important',
        marginTop: '20px',
        marginBottom: '20px',
        fontWeight: '900',
        cursor: 'pointer',
        line: '1.4',
      },
      type:{
        width: '65%',
        background: '#fafafa',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0',
        left: '15%',
        padding: 10
      },
      typeText:{
        fontWeight: 'bold',
      },
      postOn:{
        color: '#000 !important',
        fontWeight: 'bold'
      }
    })
  )

  function link(){
    const contentType = content.contentType ? content.contentType.toLowerCase() : 'none';
    const title = content.title ? content.title.replace(/\s|\?+/g, '-').toLowerCase() : 'noTitle';
    const id = content.id ? content.id : '50344';
    return(
      '/article/'+ contentType +'/'+  title +'/'+ id
    )
  }

  const classes = centerThumbStyles();

  return(
    <div className={clsx(classes.root)}>
      { type === 'featured' && (
        <React.Fragment>
          <div className={clsx(classes.thumbImg)}>
            {content.gated === true && (
                <AppPremIcon />
            )}

            <Link to={ link() } >
              <img className={clsx(classes.image)} src={content.image.src} title={content.imageTitle}  alt="center teaser"/>
            </Link>

            <div className={clsx(classes.type)}>
                <Typography
                  variant='h5'
                  className={clsx(classes.typeText, (type === 'featured' ? 'text-red' : 'text-black'))}>
                  {type === 'featured' && ("The Big Story")}
                </Typography>
            </div>
          </div>

          <div className={clsx(classes.thumbContent)}>
            <Link to={ link() } >
              <div className={clsx(classes.title)}>
                <Typography
                  variant={(type === 'featured' ? 'h4' : 'h6')}
                  className={clsx(classes.title)}
                  >
                  {content.title}
                </Typography>
              </div>
            </Link>

            <div dangerouslySetInnerHTML={{__html: content.summary}} />
            <span className={clsx(classes.postOn)}> {content.publishedOn}</span>
          </div>
        </React.Fragment>
      )}
      { type === 'normal' && (
        <React.Fragment>
          <div className={clsx(classes.thumbImg)}>
            {content.gated === true && (
                <AppPremIcon />
            )}

            <Link to={ link() } >
              <img className={clsx(classes.image)} src={content.image.src} title={content.imageTitle} alt="center teaser"/>
            </Link>
            <div className={clsx(classes.type)}>
                <Typography
                  variant='h6'
                  className={clsx(classes.typeText, 'text-black')}>
                  {content.contentType}
                </Typography>
            </div>
          </div>

          <div className={clsx(classes.thumbContent)}>
            <Link to={ link() } >
              <div className={clsx(classes.title)}>
                <Typography
                  variant={'h6'}
                  className={clsx(classes.title)}
                  >
                  {content.title}
                </Typography>
              </div>
            </Link>
            <div dangerouslySetInnerHTML={{__html: content.summary}} />
            <span className={clsx(classes.postOn)}> {content.publishedOn}</span>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
CenterTeaserThumb.defaultProps = {
  type   : 'normal',
  content:    {
    "id": 0,
    "image": "https://www.recruiter.co.uk/sites/default/files/web-boris-wins-election-pa-48997440.jpg",
    "imageTitle": "shorter working week works",
    "title": "aliquip amet cupidatat ipsum",
    "summary": "ullamco consectetur ea Lorem consectetur labore pariatur incididunt ipsum sint in enim aute ut ex nulla exercitation irure elit in",
    "body": "Mollit anim est laborum aliqua adipisicing. Voluptate consequat eu ex qui eiusmod minim occaecat. Aliqua non aliquip voluptate aliquip dolor exercitation ipsum adipisicing nulla commodo incididunt exercitation.\r\n",
    "contentType": "news",
    "publishedOn": "06 January 2019",
    "published": false,
    "featured": true,
    "gated": false,
    "type": "Financials",
    "tags": [
      "hr",
      "ssk",
      "sales"
    ]
  }
}

export default withRouter(CenterTeaserThumb)
