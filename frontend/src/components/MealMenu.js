import React, { Component } from 'react';

class MealMenu extends Component {
  render() {
    const { menu } = this.props;
    return (
      <div className=' menu-main-container'>
        <div className='card-simple menu-container'>
          <div className='card-title menu-section'>
            <h3>First Course</h3>
            {menu.firstCourse.map((course, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {course}
                </div>
              );
            })}
          </div>
          <div className='card-title menu-section'>
            <h3>Main Course</h3>
            {menu.mainCourse.map((course, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {course}
                </div>
              );
            })}
          </div>
          <div className='card-title menu-section'>
            <h3>Dessert</h3>
            {menu.desserts.map((dessert, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {dessert}
                </div>
              );
            })}
          </div>
          <div className='card-title menu-section'>
            <h3>Beverages</h3>
            {menu.beverages.map((beverage, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {beverage}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MealMenu;
