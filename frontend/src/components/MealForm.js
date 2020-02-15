import React, { Component } from 'react';
import cloudService from '../services/ExternalService';
import { connect } from 'react-redux';

import ImageUpload from './ImageUpload';
import PromotionCheckbox from './PromotionCheckbox';

var id = 1;
const MAX_FILE_SIZE = 5000000; //max size is 5MB
export class MealForm extends Component {
  state = {
    _id: '',
    hostedBy: { _id: 0, fullName: '', imgUrl: '' },
    title: '',
    description: '',
    firstCourse: [],
    mainCourse: [],
    desserts: [],
    beverages: [],
    cuisineType: '',
    mealType: '',
    price: 0,
    occurrences: [],
    capacity: 0,
    address: '',
    city: '',
    country: '',
    lat: '',
    lng: '',
    imgUrls: [],
    firstCourseTmp: '',
    mainCourseTmp: '',
    dessertTmp: '',
    drinkTmp: '',
    reviews: [],
    currency: 'USD',
    tags: [], //shall include all tags from user
    isActive: true,
    isPromoted: false,
    isBtnEnabled: true,
  };

  componentDidMount() {
    if (!this.props.meal) {
      //create mode:
      this.setState({ hostedBy: { _id: this.props.loggedInUser._id, fullName: this.props.loggedInUser.fullName, imgUrl: this.props.loggedInUser.imgUrl } });
    } else {
      const meal = this.props.meal;
      this.setState({
        hostedBy: { ...meal.hostedBy },
        _id: meal._id,
        isActive: meal.isActive,
        isPromoted: meal.isPromoted,
        tags: [...meal.tags],
        title: meal.title,
        description: meal.description,
        firstCourse: [...meal.menu.firstCourse],
        mainCourse: [...meal.menu.mainCourse],
        desserts: [...meal.menu.desserts],
        beverages: [...meal.menu.beverages],
        cuisineType: meal.cuisineType,
        mealType: meal.mealType,
        price: meal.price,
        capacity: meal.capacity,
        occurrences: [...meal.occurrences],
        address: meal.location.address,
        city: meal.location.city,
        country: meal.location.country,
        lat: meal.location.lat,
        lng: meal.location.lng,
        reviews: [...meal.reviews],
        imgUrls: [...meal.imgUrls],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.meal) !== JSON.stringify(this.props.meal) && this.props.meal) {
      //edit mode:
      const meal = this.props.meal;
      this.setState({
        hostedBy: { ...meal.hostedBy },
        _id: meal._id,
        isActive: meal.isActive,
        isPromoted: meal.isPromoted,
        tags: [...meal.tags],
        title: meal.title,
        description: meal.description,
        firstCourse: [...meal.menu.firstCourse],
        mainCourse: [...meal.menu.mainCourse],
        desserts: [...meal.menu.desserts],
        beverages: [...meal.menu.beverages],
        cuisineType: meal.cuisineType,
        mealType: meal.mealType,
        price: meal.price,
        capacity: meal.capacity,
        occurrences: [...meal.occurrences],
        address: meal.location.address,
        city: meal.location.city,
        country: meal.location.country,
        lat: meal.location.lat,
        lng: meal.location.lng,
        reviews: [...meal.reviews],
        imgUrls: [...meal.imgUrls],
      });
    }
  }

  handleImageUpload = async files => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        return;
      } else if (!files[i].type.includes('jpeg') && !files[i].type.includes('jpg') && !files[i].type.includes('png')) {
        return;
      }
    }
    this.setState({ isBtnEnabled: false });
    let imgUrls = await cloudService.uploadImages(files);
    let prevImgUrls = this.state.imgUrls;
    const newImgUrls = prevImgUrls.concat(imgUrls);
    this.setState({ imgUrls: newImgUrls }, this.enableBtn);
  };

  enableBtn = () => {
    this.setState({ isBtnEnabled: true });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let field = ev.target.name;
    let value = ev.target.value;
    if (field === 'isPromoted') {
      value = !this.state.isPromoted;
    }
    this.setState({ [field]: value });
  };

  onHandleDateAdd = ev => {
    ev.preventDefault();
    let field = ev.target.name;
    let date = ev.target.value;
    // this.setState({ [field]: value });
    if (date !== '') {
      id += 1;
      const occurrences = {
        id: id,
        date: Date.parse(date),
        attendees: [],
        total: 0
      };
      this.setState(prevState => ({
        occurrences: [...prevState.occurrences, occurrences],
      }));
    }
  };

  onHandleAddMenuItem = ev => {
    ev.preventDefault();
    let field = ev.target.name;
    let value = ev.target.value;
    let tmpFieldName = '';
    switch (field) {
      case 'firstCourse':
        tmpFieldName = 'firstCourseTmp';
        break;
      case 'mainCourse':
        tmpFieldName = 'mainCourseTmp';
        break;
      case 'desserts':
        tmpFieldName = 'dessertTmp';
        break;
      default:
        tmpFieldName = 'drinkTmp';
        break;
    }
    if (value) this.setState({ [tmpFieldName]: value });
  };

  setTags = () => {
    let newTags = [];
    newTags.push(this.state.cuisineType);
    newTags.push(this.state.mealType);
    newTags.push(this.state.title);
    newTags.push(this.state.price);
    newTags.push(this.state.city);
    newTags.push(this.state.country);
    newTags.push(this.state.address);
    newTags.push(this.state.hostedBy.fullName);
    newTags.push(this.state.description);
    newTags = newTags.concat(this.state.firstCourse);
    newTags = newTags.concat(this.state.mainCourse);
    newTags = newTags.concat(this.state.desserts);
    newTags = newTags.concat(this.state.beverages);
    this.state.occurrences.forEach(occurrence => {
      const dateToRender = new Date(occurrence.date).toLocaleDateString();
      newTags.push(dateToRender);
    });
    this.setState({ tags: newTags });
  };

  isFormComplete = () => {
    const status = this.state
    return (status.address && status.country && status.city && status.cuisineType && status.mealType && status.title && status.price && status.description && status.firstCourse && status.mainCourse && status.desserts && status.beverages && status.capacity && status.imgUrls)
  }

  onSaveMeal = async ev => {
    ev.preventDefault();
    if (this.isFormComplete()) {
      const newAddress = await cloudService.getLatLngFromAddress(this.state.address + ', ' + this.state.city + ', ' + this.state.country);
      this.setTags();
      let meal = {
        _id: this.state._id,
        isActive: true,
        isPromoted: this.state.isPromoted,
        hostedBy: this.state.hostedBy,
        menu: {
          firstCourse: this.state.firstCourse,
          mainCourse: this.state.mainCourse,
          desserts: this.state.desserts,
          beverages: this.state.beverages,
        },
        location: {
          city: this.state.city,
          country: this.state.country,
          address: this.state.address,
          lat: newAddress.lat,
          lng: newAddress.lng,
        },
        imgUrls: this.state.imgUrls,
        title: this.state.title,
        description: this.state.description,
        cuisineType: this.state.cuisineType,
        mealType: this.state.mealType,
        price: this.state.price,
        occurrences: this.state.occurrences,
        capacity: this.state.capacity,
        reviews: this.state.reviews,
        currency: this.state.currency,
        tags: this.state.tags,
      };
      if (!this.props.meal) {
        //create mode
        delete meal._id;
      }
      this.props.onSaveMeal(meal);
    }
  };

  handleDateRemoval = (occurrences, occurrenceIdx) => {
    //removes a chosen event date occurrence by the host
    const newOccurrences = [...occurrences];
    newOccurrences.splice(occurrenceIdx, 1);
    this.setState({ ...this.state, occurrences: newOccurrences });
  };

  handleMenuItemRemoval = (ev, list, idx) => {
    let field;
    switch (ev.target.nodeName) {
      case 'I':
        field = ev.target.classList[0];
        break;
      default:
        field = ev.target.name;
    }
    const newList = [...list];
    newList.splice(idx, 1);
    this.setState({ [field]: newList });
  };

  onAddMenuItem = event => {
    event.preventDefault();
    let field;
    switch (event.target.nodeName) {
      case 'I':
        field = event.target.parentNode.name;
        break;
      default:
        field = event.target.name;
    }
    let value;
    switch (field) {
      case 'firstCourse':
        value = this.state.firstCourseTmp;
        this.setState({ firstCourseTmp: '' });
        break;
      case 'mainCourse':
        value = this.state.mainCourseTmp;
        this.setState({ mainCourseTmp: '' });
        break;
      case 'desserts':
        value = this.state.dessertTmp;
        this.setState({ dessertTmp: '' });
        break;
      default:
        value = this.state.drinkTmp;
        this.setState({ drinkTmp: '' });
    }
    if (value) {
      let course = this.state[field];
      let newCourse = [...course];
      newCourse.push(value);
      this.setState({ [field]: newCourse });
    }
  };

  onImgRemoval = (event, url, idx) => {
    let newImgUrls = [...this.state.imgUrls];
    newImgUrls.splice(idx, 1);
    this.setState({ imgUrls: newImgUrls });
  };

  render() {
    return (
      <div>
        <form className='' onSubmit={this.onSaveMeal}>
          <div className='image-container'>
            <h4>Images</h4>
            <ImageUpload onImgRemoval={this.onImgRemoval} handleImageUpload={this.handleImageUpload} files={this.state.imgUrls}></ImageUpload>
          </div>
          <div className='event-info-container'>
            <h4>Details</h4>
            <div className='card-bottom-border flex column'>
              <div className='title'>
                <label htmlFor='title'>Title</label>
                <input type='text' placeholder='Event Name' id='title' name='title' value={this.state.title} onChange={this.onHandleChange} className='input-form' required></input>
              </div>
              <div className='description'>
                <label htmlFor='description'>Description</label>
                <textarea id='description' name='description' value={this.state.description} placeholder='Description' onChange={this.onHandleChange} className='textarea-form' required></textarea>
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
                  <input type='text' placeholder='Address' name='address' id='address' value={this.state.address} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
                <div className='state flex-basis-1 margin-right-10'>
                  <label htmlFor='state'>Country</label>
                  <input type='text' placeholder='State' name='country' id='country' value={this.state.country} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
                <div className='city flex-basis-1'>
                  <label htmlFor='city'>City</label>
                  <input type='text' placeholder='City' name='city' id='city' value={this.state.city} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
              </div>
              <div className='price-capacity flex'>
                <div className='price flex-basis-1 margin-right-20'>
                  <label htmlFor='price'>Price</label>
                  <input type='text' placeholder='Price' id='price' name='price' value={this.state.price} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
                <div className='capacity flex-basis-1'>
                  <label htmlFor='capacity'>How many people</label>
                  <input type='number' placeholder='Capacity' id='capacity' name='capacity' value={this.state.capacity} onChange={this.onHandleChange} className='input-form' required></input>
                </div>
              </div>
              <div className='flex row flex space-even'>
                <div className='date flex-basis-1 margin-right-20'>
                  <div className='flex align-center'>
                    <div className='flex column margin-right-20 width-50'>
                      <label htmlFor='date'>Date</label>
                      <input className='input-date' type='date' name='date' placeholder='Date' id='date' onChange={this.onHandleDateAdd} value={this.state.occurences} className='input-date'></input>
                    </div>
                    <div className='promotion flex-basis-1'>
                      <PromotionCheckbox label={'Would you like to promote your event?'} handleChange={this.onHandleChange} isPromoted={this.state.isPromoted}></PromotionCheckbox>
                    </div>
                  </div>
                  <div className='width-50'>
                    {this.state.occurrences && (
                      <div>
                        <ul className='clean-list occurrence-list'>
                          {' '}
                          {this.state.occurrences.map((occurrence, idx) => {
                            const dateToRender = new Date(occurrence.date).toLocaleDateString();
                            return (
                              <li className='occurrence-date' key={idx}>
                                {dateToRender}
                                <span>
                                  <i className='far fa-times-circle icon-small' onClick={() => this.handleDateRemoval(this.state.occurrences, idx)}></i>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
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
                  <div className='course-title-wrapper flex justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='First course dish' name='firstCourse' value={this.state.firstCourseTmp} className='input-form' onChange={this.onHandleAddMenuItem} required></input>
                      {/* {this.state.occurrences && <div ><ul className="clean-list "> {this.state.occurrences.map((occurrence, idx) => <li>{occurrence.date}<i className="icon-small fas fa-minus" onClick={() => this.handleOccurenceRemoval(this.state.occurrences, idx)}></i></li>)}</ul></div>} */}
                      {this.state.firstCourse && (
                        <div>
                          <ul className='clean-list '>
                            {' '}
                            {this.state.firstCourse.map((course, idx) => (
                              <li className='menu-list-courses' name='firstCourse' key={idx}>
                                {course}
                                <i className='firstCourse far fa-times-circle icon-small' name='firstCourse' onClick={ev => this.handleMenuItemRemoval(ev, this.state.firstCourse, idx)}></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <a name='firstCourse' className='' title='Add new menu item' href='#' onClick={this.onAddMenuItem} required>
                      <i name='firstCourse' className='icon-larger fas fa-plus-square'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Main Course</h3>
                  <div className='course-title-wrapper flex justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Main course dish' name='mainCourse' value={this.state.mainCourseTmp} className='input-form' onChange={this.onHandleAddMenuItem} required></input>
                      {this.state.mainCourse && (
                        <div>
                          <ul className='clean-list '>
                            {' '}
                            {this.state.mainCourse.map((course, idx) => (
                              <li className='menu-list-courses' name='mainCourse' key={idx}>
                                {course}
                                <i className='mainCourse far fa-times-circle icon-small' name='mainCourse' onClick={ev => this.handleMenuItemRemoval(ev, this.state.mainCourse, idx)}></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <a name='mainCourse' className='' title='Add new menu item' href='' onClick={this.onAddMenuItem}>
                      <i name='mainCourse' className='icon-larger fas fa-plus-square'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Dessert</h3>
                  <div className='course-title-wrapper flex justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Dessert' name='desserts' className='input-form' value={this.state.dessertTmp} onChange={this.onHandleAddMenuItem} required></input>
                      {this.state.desserts && (
                        <div>
                          <ul className='clean-list '>
                            {' '}
                            {this.state.desserts.map((course, idx) => (
                              <li className='menu-list-courses' name='desserts' key={idx}>
                                {course}
                                <i className='desserts far fa-times-circle icon-small' name='desserts' onClick={ev => this.handleMenuItemRemoval(ev, this.state.desserts, idx)}></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <a name='desserts' className='' title='Add new menu item' href='' onClick={this.onAddMenuItem}>
                      <i name='desserts' className='icon-larger fas fa-plus-square'></i>
                    </a>
                  </div>
                </div>
                <div className='card-title menu-section flex column'>
                  <h3>Beverage</h3>
                  <div className='course-title-wrapper flex justify-center'>
                    <div className='menu-item'>
                      <input type='text' placeholder='Beverage' name='beverages' className='input-form' value={this.state.drinkTmp} onChange={this.onHandleAddMenuItem} required></input>
                      {this.state.beverages && (
                        <div>
                          <ul className='clean-list '>
                            {this.state.beverages.map((course, idx) => (
                              <li className='menu-list-courses' name='beverages' key={idx}>
                                {course}
                                <i className='beverages far fa-times-circle icon-small' name='beverages' onClick={ev => this.handleMenuItemRemoval(ev, this.state.beverages, idx)}></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <a name='beverages' className='' title='Add new menu item' href='' onClick={this.onAddMenuItem}>
                      <i name='beverages' className='icon-larger fas fa-plus-square'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='save'>
            <button className='button btn-lg btn-main' onClick={this.onSaveMeal} disabled={!this.state.isBtnEnabled}>
              SAVE
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default MealForm;