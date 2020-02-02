import React, { Component } from 'react';

class MealMenu extends Component {
  render() {
    const { menu } = this.props;
    return (
      <div className=' menu-main-container'>
        <div className='card-simple card-bkg-white menu-container'>
          <div className='main-title'>
            <div className='decor'>
              <svg xmlns='http://www.w3.org/2000/svg' width='41.125' height='9.146'>
                <path fill='none' stroke='#f8b500' strokeMiterlimit='10' d='M40.881 8.576L20.562.591.244 8.576'></path>
                <path fill='none' stroke='#f8b500' strokeMiterlimit='10' d='M40.881.591L20.562 8.576.243.591'></path>
              </svg>
            </div>
            <h3 id='menu'>Menu</h3>
            <div className='decor'>
              <svg xmlns='http://www.w3.org/2000/svg' width='41.125' height='9.146'>
                <path fill='none' stroke='#f8b500' strokeMiterlimit='10' d='M40.881 8.576L20.562.591.244 8.576'></path>
                <path fill='none' stroke='#f8b500' strokeMiterlimit='10' d='M40.881.591L20.562 8.576.243.591'></path>
              </svg>
            </div>
          </div>
          <div className='menu-section'>
            <h3>First Course</h3>

            {menu.firstCourse.map((course, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {course}
                </div>
              );
            })}
          </div>
          <div className='menu-section'>
            <h3>Main Course</h3>
            {menu.mainCourse.map((course, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {course}
                </div>
              );
            })}
          </div>
          <div className='menu-section'>
            <h3>Dessert</h3>
            {menu.desserts.map((dessert, idx) => {
              return (
                <div key={idx} className='menu-item'>
                  {dessert}
                </div>
              );
            })}
          </div>
          <div className='menu-section'>
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
