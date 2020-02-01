

export default {
    addMsg
}

export function addMsg(newMsg) {
  
  return async dispatch => {
    // const msg = await MealService.query(newMsg);
    const msg = newMsg
    console.log('SocketAction -> msg',msg);
      dispatch({ type: 'ADD_MSG', msg });
    };
  }

