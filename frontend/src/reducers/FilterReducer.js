
let initialState = {
    filter: {
        userId: '',
        at: '',
        type: '',
        location: {
            city: '',
            country: '',
        },
        tags: ''
    }
};

export default function FilterReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_FILTER':

            return {
                ...state,
                filter: { ...action.filter }
            };
        default:
            return state;
    }
}