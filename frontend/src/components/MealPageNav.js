import React, { Component } from 'react';
import { connect } from 'react-redux';
class MealPageNav extends Component {
  render() {
    let { hostRating, eventSetup } = this.props;
    return (
      <div className='card-simple nav-container'>
        <div className='top-box flex '>
          <a className='btn' href='#menu'>
            Menu
          </a>
          <a className='btn' href='#reviews'>
            Reviews
          </a>
          <a className='btn' href='#location'>
            Location
          </a>
        </div>
        <div className='bottom-box flex'>
          <div className={hostRating.avgRate && hostRating.avgRate > 0 ? 'rate' : 'hide'}>
            <i className='icon-small fas fa-star'></i>
            <span>{hostRating.avgRate}</span>
            <span>({hostRating.totalRated})</span>
          </div>
          <div className='meal-period'>
            <span>{eventSetup.startTime}</span> - <span>{eventSetup.endTime}</span>
          </div>
          <div>{eventSetup.mealType}</div>
          <div>{eventSetup.cuisineType}</div>
          <div className='meal-guests'>
            <span>{eventSetup.capacity}</span>
            <span> Guests </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MealPageNav);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class MealPageNav extends Component {
//   state = { startTime: '', endTime: '', minCapacity: '', totalRates: 0, avgRate: 0, rateClass: 'hide' };

//   componentDidMount() {
//     const { meal } = this.props;
//     let startTime = meal.mealType === 'Dinner' ? '6:00PM' : meal.mealType === 'Lunch' ? '12:00PM' : '9:00AM';
//     let endTime = meal.mealType === 'Dinner' ? '9:00PM' : meal.mealType === 'Lunch' ? '4:00PM' : '11:00AM';
//     let minCapacity = Math.floor(parseInt(meal.capacity) / 2);
//     let totalRates = meal.reviews.length;
//     let avgRate = 0;
//     let rateClass = 'hide';

//     if (totalRates > 0) {
//       avgRate = meal.reviews.reduce((result, current) => result + parseInt(current.rate), 0) / meal.reviews.length;

//       if (avgRate) rateClass = 'rate';
//     }

//     this.setState({
//       startTime: startTime,
//       endTime: endTime,
//       minCapacity: minCapacity,
//       totalRates: totalRates,
//       avgRate: avgRate,
//       rateClass: rateClass,
//     });
//   }

//   render() {
//     let { meal } = this.props;
//     return (
//       <div className='nav-container'>
//         <div className='top-box flex '>
//           <a className='btn' href='#menu'>
//             Menu
//           </a>
//           <a className='btn' href='#reviews'>
//             Reviews
//           </a>
//           <a className='btn' href='#location'>
//             Location
//           </a>
//         </div>

//         <div className='bottom-box flex'>
//           <div className={this.state.rateClass}>
//             <i className='icon-small fas fa-star'></i>
//             <span>{this.state.avgRate.toFixed(1)}</span>
//             <span>({this.state.totalRates})</span>
//           </div>
//           <div className='meal-period'>
//             <span>{this.state.startTime}</span> - <span>{this.state.endTime}</span>
//           </div>
//           <div>{meal.mealType}</div>
//           <div>{meal.cuisineType}</div>
//           <div className='meal-guests'>
//             <span>{meal.capacity}</span>
//             <span> Guests </span>
//           </div>
//           {/* <div className='available-places'>
//             <span> Available Places-{meal.capacity - meal.currCapacity}</span>
//           </div> */}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   loggedInUser: state.user.loggedInUser,
// });

// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(MealPageNav);
