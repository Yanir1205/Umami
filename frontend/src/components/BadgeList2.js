import React, { Component } from 'react';

import BadgePreview from './BadgePreview'
import { withRouter } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class BadgeList2 extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <span className="container  badge-list-container margin-top-20">
                {/* {this.props.badges && this.props.badges.map((badge, idx) => {
                    return <div className="badge-card-container " key={idx}>
                        <BadgePreview isSelected={badge === this.props.selectedBadge ? 'selected' : ''} onBadgeClick={this.props.onBadgeClick} badge={badge} />
                    </div>
                })} */}


                {/* //group the badges in groups of 4 and display each group in a carousel with no status (just arrows) */}
                <Carousel showThumbs={false} showStatus={false} infiniteLoop={false}>
                    {this.props.badges && this.props.badges.map((badge, idx) => {
                        return [<p key={idx+'1'} className="card-img">{badge}</p>,
                        <p key={idx+'2'} className="card-img"></p>]
                    })}
                </Carousel>
            </span>
        )
    }
}

export default withRouter(BadgeList2);


/*

<div className="img-carousel-container">
                        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
                            {this.props.meal.imgUrls.map((imgUrl, idx) => {
                                return <img key={idx} src={imgUrl} alt="" className="card-img"></img>
                            })}
                        </Carousel>
                    </div>

*/
