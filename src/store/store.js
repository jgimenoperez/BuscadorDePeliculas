import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { customMiddleware } from "../middelwares/middewares";
import moviesReducer from "../reducers/moviesReducer";


const logger = createLogger();

export default configureStore({
    reducer: {
      movies: moviesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat( customMiddleware, thunkMiddleware),
  
  });
  