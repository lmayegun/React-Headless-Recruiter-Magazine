import React from 'react';
import Slider from "react-slick";
import {Icon} from '@material-ui/core';
import clsx from 'clsx';

import {CenterTeaserThumb,AppIconHeader,AppMagCover} from '@localpkg';

class News extends React.Component {

  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className={clsx(this.classes.carouselContainer)}>
        <div>
            <div className={"sliderTitle"}>
              <AppIconHeader title={this.props.sliderTitle}/>
            </div>
        </div>

        <div>
            <div className={"subTitlesWrapper"}>
              {this.props.sliderTitle === 'recruiter magazine'  && (
                <React.Fragment>
                  <h2 className={"text"}> SUBSCRIBE TO PRINT </h2>
                  <h2 className={"text"}> VIEW PAST ISSUES </h2>
                </React.Fragment>
              )}
            </div>
        </div>

        {this.props.type === 'content' && (
          <Slider ref={c => (this.slider = c)} {...settings}>
            {
              this.props.slideData.map((key, index)=>{
                return(
                  <div key={index}>
                    <div className={"magazine"}>
                      <CenterTeaserThumb content={key} />
                    </div>
                  </div>
                )
              })
            }
          </Slider>
        )}

        {this.props.type === 'cover' && (

          <Slider ref={c => (this.slider = c)} {...settings}>
            {
              this.props.slideData.map((key, index)=>{
                return(
                  <div key={index}>
                    <div className={"magazine"}>
                      <AppMagCover magazine={key} longTitleLength={this.props.longTitleLength}/>
                    </div>
                  </div>
                )
              })
            }
          </Slider>
        )}


        <div>
          <button className="navBtn prevBtn" onClick={this.previous}>
              <Icon>arrow_back_ios</Icon>
          </button>
          <button className="navBtn nextBtn" onClick={this.next}>
            <Icon>arrow_forward_ios</Icon>
          </button>
        </div>
      </div>
    );
  }
}

News.defaultProps = {
  classes: {},
  type : 'content',
  slidesToShow: 3,
}

export default News;