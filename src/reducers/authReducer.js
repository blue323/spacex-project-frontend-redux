import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: false,
    isLoginMode: true,
    isLoggedIn: null,
    token: null,
    userId: null,
    tokenExpirationDate: null
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: state.userId,
          token: state.token,
          expiration: state.tokenExpirationDate.toISOString()
        })
      );
    },
    autoLogin(state, action) {
      const storedData = JSON.parse(localStorage.getItem('userData'));

      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        state.isLoggedIn = true
        state.token = storedData.token
        state.userId = storedData.userId
        state.tokenExpirationDate = storedData.expiration
      } else {
        console.log('auto login failed')
      }
    },
    logout(state, action) {
      state.error = false
      state.isLoginMode = true
      state.isLoggedIn = false
      state.token = null
      state.userId = null
      state.tokenExpirationDate = null
      localStorage.removeItem('userData')
    },
    changeModee(state, action) {
      state.isLoginMode = !state.isLoginMode
    },
    loginOrSignupError(state, action) {
      state.error = !state.error
    }
  },
});

const { login, autoLogin, logout, changeModee, loginOrSignupError } = authSlice.actions;

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      let response = await fetch('https://spacex-project-backend.vercel.app/api/users/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })

    response = await response.json()
    
    
    dispatch(login(response));
    } catch (error) {
      dispatch(loginOrSignupError())
      //console.log(error)
    }
  };
};

export const signupUser = (userName, email, password) => {
  return async (dispatch) => {
    try {
      let response = await fetch('https://spacex-project-backend.vercel.app/api/users/signup', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        email: email,
        password: password
      }),
      })

      response = await response.json()
    
    
      dispatch(login(response));
    } catch (error) {
      dispatch(loginOrSignupError())
      //console.log(error)
    }
  };
};


export const autoLoginUser = () => {
  return async (dispatch) => {
    dispatch(autoLogin());
  };
};

export const changeMode = () => {
   return async (dispatch) => {
    dispatch(changeModee())
   }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logout()) 
  };
};

export const closeModal = () => {
  return async (dispatch) => {
    dispatch(loginOrSignupError()) 
  };
};

export default authSlice.reducer;