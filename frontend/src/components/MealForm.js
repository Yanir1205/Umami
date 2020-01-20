import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

export class MealForm extends Component {
  state = {
    hostedBy: { _id: 0, fullName: '', imgUrl: '' },
    title: '',
    description: '',
    menu: { firstCourse: '', mainSoup: '', desserts: [], beverages: [] },
    cuisineType: '',
    mealType: '',
    price: 0,
    date: 0,
    capacity: 0,
    location: { address: '', city: '', country: '' },
    imgUrls: [],
  };

  componentDidMount() {
    //TODO - get the 'loogedInUser' or the 'guest-mood' profile and init the 'hostedBy' object
    if (this.props.meal) {
      this.setState({ meal: this.props.meal });
    }
  }

  handleImageUpload = files => {
    this.setState({
      imgUrls: [
        'https://i.pinimg.com/564x/ea/16/38/ea163859e57fd49a35219038bc771c07.jpg',
        'https://i.pinimg.com/564x/9a/6e/01/9a6e012ea78b5e55eb3fa7c1af4c44e6.jpg',
        'https://i.pinimg.com/236x/65/6f/d9/656fd9dd5018de65828656412365bba4.jpg',
        'https://i.pinimg.com/564x/20/62/e7/2062e780dccca8f2aeb0cf01dc8cab78.jpg',
        'https://i.pinimg.com/564x/0a/1a/85/0a1a85bfddea381574da7ddfce59cb64.jpg',
        'https://i.pinimg.com/564x/98/e1/f6/98e1f67a5f740665ba9a7f16c463bdf5.jpg',
      ],
    });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let field = ev.target.name;
    let value = ev.target.value;
    this.setState({ [field]: value });
    console.log('MealForm onHandleLocationChange -> ',this.state );
  };

  onHandleLocationChange = ev => {
    ev.preventDefault();
    let tempLocation = this.state.location;
    let field = ev.target.name;
    let value = ev.target.value;
    tempLocation[field] = value ;
    this.setState({ location: tempLocation });
    debugger
  };

  onHandleMenuListChange = ev => {
    ev.preventDefault();
    let field = ev.target.name;
    let value = ev.target.value;
    let tempMenu = this.state.menu;
    if (field === 'desserts' || field === 'beverages') {
      tempMenu[field].push(value);
    } else {
      tempMenu[field] = value ;
    }
    this.setState({ menu: tempMenu });
  };

  onSaveMeal = ev => {
    ev.preventDefault();
    let meal = {
      isActive:true,
      hostedBy: this.state.hostedBy,
      menu: this.state.menu,
      location: this.state.location,
      imgUrls: this.state.imgUrls,
      title: this.state.title,
      description: this.state.description,
      cuisineType: this.state.cuisineType,
      mealType: this.state.mealType,
      price: this.state.price,
      date: Date.parse(new Date(this.state.date)),
      capacity: this.state.capacity,
      reviews:[],
      attendees:[]
    };

    this.props.onSaveMeal(meal);
  };

  render() {
    return (
      <div>
        <form className='' onSubmit={this.onSaveMeal}>
          <div className='image-container'>
            <h4>Images</h4>
            <ImageUpload handleImageUpload={this.handleImageUpload}></ImageUpload>
          </div>
          <div className='event-info-container'>
            <h4>Details</h4>
            <div className='card-bottom-border flex column'>
              <div className='title'>
                <label htmlFor='title'>Title</label>
                <input type='text' placeholder='Event Name' id='title' name='title' id='title' value={this.state.title} onChange={this.onHandleChange} className='input-form' required></input>
              </div>
              <div className='description'>
                <label htmlFor='description'>Description</label>
                <textarea id='description' name='description' id='description' value={this.state.description} placeholder='Description' onChange={this.onHandleChange} className='textarea-form' required></textarea>
              </div>
              <div className='cuisineType'>
                <label htmlFor='cuisineType'>Cuisine</label>
                <input type='text' placeholder='Cuisine' name='cuisineType' id='cuisineType' value={this.state.cuisineType} onChange={this.onHandleChange} className='input-form' required></input>
              </div>
              <div className='mealType'>
                <label htmlFor='mealType'>Meal</label>
                <input type='text' placeholder='Dinner | Lunch | Breakfest' name='mealType' id='mealType' value={this.state.mealType} onChange={this.onHandleChange} className='input-form' required></input>
              </div>
              <div className='flex row flex space-between'>
                <div className='address flex-basis-1 margin-right-10'>
                  <label htmlFor='address'>Address</label>
                  <input type='text' placeholder='Address' name='address' id='address' value={this.state.address} onChange={this.onHandleLocationChange} className='input-form' required></input>
                </div>
                <div className='state flex-basis-1 margin-right-10'>
                  <label htmlFor='state'>State</label>
                  <input type='text' placeholder='State' name='state' id='state' value={this.state.state} onChange={this.onHandleLocationChange} className='input-form' required></input>
                </div>
                <div className='city flex-basis-1'>
                  <label htmlFor='city'>City</label>
                  <input type='text' placeholder='City' name='city' id='city' value={this.state.city} onChange={this.onHandleLocationChange} className='input-form' required></input>
                </div>
              </div>
              <div className='flex row flex space-even'>
                <div className='date flex-basis-1 margin-right-10'>
                  <label htmlFor='date'>Date</label>
                  <input type='date' name='date' placeholder='Date' id='date' onChange={this.onHandleChange} value={this.state.date} className='input-date'></input>
                </div>
                <div className='price flex-basis-1'>
                  <label htmlFor='price'>Price</label>
                  <input type='text' placeholder='Price' id='price' name='price' value={this.state.price} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
              </div>
            </div>
          </div>
          <div className='event-menu-container'>
            <h4>Menu</h4>
            <div className='card-bottom-border menu-main-container flex column align-center justify-center'>
              <div className='menu-container'>
                <div className='card-title menu-section flex column'>
                  <h3>First Course</h3>
                  <div className='course-title-wrapper  flex-inline align-center justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='First course dish' name='firstCourse' className='input-form' onChange={this.onHandleMenuListChange} required></input>
                    </div>
                    <a className='btn-round-sm' title='Add new menu item' href='' onClick={this.onAddInput} required>
                      <i className='icon-small fas fa-plus'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Main Course</h3>
                  <div className='course-title-wrapper flex-inline align-center justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Main course dish' name='mainSoup' className='input-form' onChange={this.onHandleMenuListChange} required></input>
                    </div>
                    <a className='btn-round-sm' title='Add new menu item' href='' onClick={this.onAddInput}>
                      <i className='icon-small  fas fa-plus'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Dessert</h3>
                  <div className='course-title-wrapper flex-inline align-center justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Dessert' name='desserts' className='input-form' onChange={this.onHandleMenuListChange} required></input>
                    </div>
                    <a className='btn-round-sm' title='Add new menu item' href='' onClick={this.onAddInput}>
                      <i className='icon-small  fas fa-plus'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Beverage</h3>
                  <div className='course-title-wrapper flex-inline align-center justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Beverage' name='beverages' className='input-form' onChange={this.onHandleMenuListChange} required></input>
                    </div>
                    <a className='btn-round-sm' title='Add new menu item' href='' onClick={this.onAddInput}>
                      <i className='icon-small fas fa-plus'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='save'>
            <button type='submit' className='button btn-exlg btn-ghost' onSubmit={this.onSaveMeal}>
              SAVE
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default MealForm;
