
import React, { Component } from 'react';

export default class TableDetailsHost extends Component {

    
    render(){

        const occurrences = this.props.occurrence
        
        debugger
        return (
            occurrences && (
              <div className='table '>
                <table id='atendees ' className='table'>
                  <thead>
                    <td id='Date'>Date</td>
                    <td id='TotalRegistered'> Registered </td>
                    <td id='revenue'>Revenue </td>
                    <td id='revenue'>Commission </td>
                  </thead>
                  {occurrences.map(occurrence => {
                    return (
                      <React.Fragment>
                        <tbody>
                          <td>
                            {
                              <span>
                                {new Date(occurrence.date)
                                  .toString()
                                  .split(' ')
                                  .slice(1, 4)
                                  .join(' ')}
                              </span>
                            }
                          </td>
                          <td> {<span> {occurrence.total}</span>}</td>
                          <td>{'$' + occurrence.total * rowData.price}</td>
                          <td>{'$' + occurrence.total * rowData.price * 0.1}</td>
                        </tbody>
                      </React.Fragment>
                    );
                  })}
                </table>
              </div>
            )
          );
    }
}