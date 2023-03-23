import { createSlice } from "@reduxjs/toolkit";
//import blogService from "../services/blogs";
//import { createNotification } from "./notificationReducer";
import { past } from '../bodyToQueryLaunches';

const launchesSlice = createSlice({
  name: "launches",
  initialState: [],
  reducers: {
    setLaunches(state, action) {
      return action.payload;
    },
  },
});

const { setLaunches } = launchesSlice.actions;

export const initializeLaunches = () => {
  return async (dispatch) => {
    let response = await fetch('https://api.spacexdata.com/v5/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(past),
    })

    response = await response.json()
  
    dispatch(setLaunches(response.docs));
  };
};

export default launchesSlice.reducer;