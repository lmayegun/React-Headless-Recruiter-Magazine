import React, {useEffect} from 'react';
import {FuseNavigation} from '@localpkg';
import clsx from 'clsx';
import * as Actions from 'app/store/actions/app';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

function Navigation(props)
{
    const dispatch = useDispatch();
    const navigationTermNews = useSelector(({navigationTerm}) => navigationTerm.taxonomyTermNewsState);
    const navigationTermArticle = useSelector(({navigationTerm}) => navigationTerm.taxonomyTermArticleState);
    const navigationTermIndustrySectors = useSelector(({navigationTerm}) => navigationTerm.taxonomyTermIndustrySectorsState);
    const navigationTermMagazine = useSelector(({navigationTerm}) => navigationTerm.taxonomyTermMagazineState);
    const navigationTermSubjects = useSelector(({navigationTerm}) => navigationTerm.taxonomyTermSubjectsState);
    const navigation = useSelector(({navigation}) => navigation);

    useEffect(()=>{
      dispatch(Actions.getTaxonomyTermNews())
      dispatch(Actions.getTaxonomyTermArticle())
      dispatch(Actions.getTaxonomyTermIndustrySectors())
      dispatch(Actions.getTaxonomyTermMagazine())
      dispatch(Actions.getTaxonomyTermSubjects())
    },[dispatch])

    useEffect(()=>{
      if(navigationTermNews){
        dispatch(Actions.appendNavigationItem(
          navigationTermNews
        ,'news-type'))
      }

      if(navigationTermArticle){
        dispatch(Actions.appendNavigationItem(
          navigationTermArticle
        ,'article-type'))
      }
      
      if(navigationTermIndustrySectors){
        dispatch(Actions.appendNavigationItem(
          navigationTermIndustrySectors
        ,'industry'))
      }

      if(navigationTermMagazine){
        dispatch(Actions.appendNavigationItem(
          _.reverse(navigationTermMagazine)
        ,'magazine'))
      }

      if(navigationTermSubjects){
        dispatch(Actions.appendNavigationItem(
          navigationTermSubjects
        ,'subjects'))
      }
    },[
      navigationTermNews,
      navigationTermArticle,
      navigationTermIndustrySectors,
      navigationTermMagazine,
      navigationTermSubjects,
      dispatch
     ])

    return (
      <div>
        <FuseNavigation className={clsx("navigation", props.className)} navigation={navigation} layout={props.layout} dense={props.dense}/>
      </div>
    );
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default Navigation;