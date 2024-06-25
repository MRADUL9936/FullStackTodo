
// this is store a single source of truth , there can only be one store in a react application

import { configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'


export const store=configureStore({
    reducer:{
        todos:todoReducer}
})