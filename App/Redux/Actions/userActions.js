export const mapStateToProps = state => {
  let data = state.userReducer
  return {
    isLoader: data.isLoader,
    isLoggedIn: data.isLoggedIn,
    userData: data.userData,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLoader: status => {
      dispatch({ type: "SET_LOADER_STATUS", payload: status });
    },
    setLoginStatus: status => {
      dispatch({ type: "SET_LOGIN_STATUS", payload: status });
    },
    setUserData: data => {
      if(data !== undefined){
        dispatch({ type: "SET_USER_DATA", payload: data });
      }else{
        dispatch({ type: "SET_USER_DATA", payload: {} });
      }
    },
  };
};