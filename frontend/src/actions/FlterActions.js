
export default {
    setFilter
};

export function setFilter(filter) {
    // let filterToSave = filter;

    // if (filter.at) { //if date filtering is required:

    //     const msPerDay = 86400 * 1000;
    //     let begining = filter.at - (filter.at % msPerDay);
    //     begining += ((new Date()).getTimezoneOffset() * 60 * 1000);
    //     filterToSave.at = {};
    //     filterToSave.at.from = begining;
    //     filterToSave.at.to = begining + msPerDay - 1

    // }

    return (dispatch) => dispatch(_setFilter(filter))
}


/*

var ms = 1340323100024;
var msPerDay = 86400 * 1000;
var beginning = ms - (ms % msPerDay);
    beginning += ((new Date).getTimezoneOffset() * 60 * 1000);

*/

function _setFilter(filter) {
    return {
        type: 'SET_FILTER',
        filter
    }
}