
let initialState = {
    filter: {
        userId: '',
        at: Date.now(),
        type: '',
        location: {
            city: '',
            country: '',
        }
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