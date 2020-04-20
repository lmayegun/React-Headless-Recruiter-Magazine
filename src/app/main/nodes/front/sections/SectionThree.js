import React,{useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import withReducer from 'app/store/withReducer';
import {reducer} from './store/reducers';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import { AppIconHeader,
        AppLatestJobs,
        AppMostPopular,
      } from '@localpkg';

const useStyles = makeStyles( theme => ({
   container: {
     display: 'flex',
     flexDirection: 'column',
     marginBottom: 50,
     padding: 20,
     [theme.breakpoints.up('lg')]:{
       flexDirection: 'row',
     }
   },
   sectionThreeCol: {
     minHeight: 500,
     width: '100%',
     '&.first-col':{
       [theme.breakpoints.up('lg')]:{
         marginRight: 20,
         width: '200%'
       }
     },
     '&.second-col':{
       [theme.breakpoints.up('lg')]:{

       }
     },
     [theme.breakpoints.up('md')]: {

     },
     [theme.breakpoints.up('lg')]: {

     }
   },
 })
);

const SectionThree = ()=>{
  const classes = useStyles();

  const dispatch = useDispatch();
  const articleMostPopular = useSelector( ({data}) => data.contents.articleMostPopularState );

  const [mostPopularData, setMostPopularData] = useState(articleMostPopular);

  useEffect(()=>{
    dispatch(Actions.getArticleMostPopular());
  },[dispatch])

  useEffect(()=>{
    setMostPopularData(articleMostPopular)
  },[articleMostPopular])

  if(!mostPopularData){
    return null;
  }

  return(
      <div className={clsx(classes.container)}>
        <div className={clsx(classes.sectionThreeCol, "first-col")}>
          <AppIconHeader title="most popular" />
          <AppMostPopular content={mostPopularData} />
        </div>

        <div className={clsx(classes.sectionThreeCol, "second-col")}>
          <AppIconHeader title="recruiter twitter" />
          <AppLatestJobs />
        </div>
      </div>
  )
}

export default withReducer('data', reducer)(React.memo(SectionThree));
