import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { withRouter } from "react-router";


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';


class BadgeList extends Component {

    menuItems;

    // constructor(props) {
    //     super(props);
    //     // call it again if items count changes
    //     this.menuItems = this.menuList(this.badgesToList(), selected);
    // }

    state = {
        selected,
       
    }

    componentDidMount() {
    }

    menuList = (list, selected) =>
        list.map(el => {
            const { name } = el;

            // return <MenuItem text={name} key={name} selected={selected} />;
            return <div key={name}
                className={`menu-item ${selected ? 'active' : ''}`}
            >{name}</div>
        });



    onSelect = key => {
        this.setState({ selected: key });
        this.props.onBadgeClick(key)
    }

    badgesToList = () => {
        const list = []
        this.props.badges.forEach(badge => {
            list.push({ name: badge })
        })
        return list;
    }

    render() {
        const { selected } = this.state;
        // Create menu from items
        this.menuItems = this.menuList(this.badgesToList(), selected) 
        let menu = this.menuItems;
        return (
            <div className="App">
                <ScrollMenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}

export default withRouter(BadgeList);