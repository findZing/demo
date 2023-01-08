import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from './admin/auth'
import appReducer from './app'
import dashBoardReducer from "./dashBoard";
import modalEditProductReducer from "./admin/modalEditProduct";
import navbarReducer from "./navbar"

// const reducers = combineReducers({
//     auth: authReducer,
//     app: appReducer,
//     dashboard: dashBoardReducer
// })

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token'],
    // whitelist: ['loginOrNot']
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: combineReducers({
        auth: persistedReducer,
        app: appReducer,
        dashboard: dashBoardReducer,
        modaleditproduct: modalEditProductReducer,
        navbar: navbarReducer
    }),
    middleware: [thunk]
})