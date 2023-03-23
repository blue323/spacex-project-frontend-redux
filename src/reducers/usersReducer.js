import { createSlice, current } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addLaunch(state, action) {
      const exitsUser = state.find((user) => user.id === action.payload.userId)
      
      if(exitsUser) {
        exitsUser.launches.push({ launchId: action.payload.launchId })
      }
    },
    removeLaunch(state, action) {
      let user = state.find(users => users.id === action.payload.userId)
      let removeLaunch = user.launches.filter(launch => launch.launchId !== action.payload.launchId)
      user.launches = removeLaunch
    },
    deleteAccount(state, action) {
      return action.payload;
    }
  },
});

const { setUsers, addLaunch, removeLaunch, deleteAccount } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    let response = await fetch('https://spacex-project-backend.vercel.app/api/users/', {
    method: 'GET',
    })

    response = await response.json()
  
    dispatch(setUsers(response.users));
  };
};

export const addLaunchToUser = (url) => {
  return async (dispatch) => {
    let response = await fetch(url, {
    method: 'PATCH',
    })

    response = await response.json()
    
    dispatch(addLaunch(response));
  };
};

export const removeLaunchFromUser = (url) => {
  return async (dispatch) => {
    let response = await fetch(url, {
    method: 'DELETE',
    })

    response = await response.json()

    dispatch(removeLaunch(response));
  };
};

export const removeUser = (url) => {
  return async (dispatch) => {
    let response = await fetch(url, {
    method: 'DELETE',
    })

    response = await response.json()
    
    dispatch(deleteAccount(response.users));
  };
};



export default usersSlice.reducer;