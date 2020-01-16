import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

// import UserMealPreview from './UserMealPreview'

export default function UserMealList({ meal }) {
    debugger;

    return <ul>
        {meal.title}
    </ul>

}