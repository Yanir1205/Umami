
export default {
    setFilter
};

export function setFilter(filter) {
    return async dispatch => await dispatch(_setFilter(filter))
}

function _setFilter(filter) {
    return {
        type: 'SET_FILTER',
        filter
    }
}