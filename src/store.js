import { configureStore } from "@reduxjs/toolkit";
import launchesReducer from "./reducers/launchesReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    launches: launchesReducer,
    users: usersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;