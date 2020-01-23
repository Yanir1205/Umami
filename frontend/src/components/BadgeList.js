import React, { Component } from 'react';

import BadgePreview from './BadgePreview'
import { withRouter } from "react-router";

class BadgeList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <span >
                {this.props.badges && this.props.badges.map((badge, idx) => {
                    return <div className="cuisine-list " key={idx}>
                        <BadgePreview  isSelected={badge === this.props.selectedBadge ? 'selected' : ''} onBadgeClick={this.props.onBadgeClick} badge={badge} />
                    </div>
                })}
            </span>
        )
    }
}

export default withRouter(BadgeList);
