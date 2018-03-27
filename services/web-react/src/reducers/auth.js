const loginReducerDefaultState = {
	token: null,
  firstName: "",
  lastName: ""
};

export default (state = loginReducerDefaultState, action) => {
  switch(action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        token: action.data.token,
        firstName: action.data.firstName,
        lastName: action.data.lastName
      };
    default:
      return state;
  }
};