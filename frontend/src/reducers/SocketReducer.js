
let initialState = {
    msg: '',
    
};

export default function SocketReducer(state = initialState, action = {}) {

    switch (action.type) {
        case 'ADD_MSG':
            return {...state, msg:action.msg };
        default:
            return state;
    }
}