import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './reducers'

const initialState = {}

const store = configureStore({
    reducer: rootReducers, 
    initialState: initialState
})

export default store;