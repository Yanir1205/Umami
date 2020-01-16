import React, { Component } from 'react';

export class Menu extends Component {

  render() {
    const menu = this.props.menu
    console.log("Menu -> render ", menu);
    
    return <div className="menu-containner">Meal Menu
      {menu && <div > 
        <p>first course: {menu.firstCourse}</p>
        <p>main soup: {menu.mainSoup}</p>
        <p>desserts: {menu.desserts.map((dessert  )=> {
          return dessert+ ' '})}</p>
        <p>beverages: {menu.beverages.map((beverage) => {
          return beverage+' '})}</p>
        </div>}
    </div>;
  }
}





export default Menu;
