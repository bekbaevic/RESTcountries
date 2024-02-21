import { configureStore } from '@reduxjs/toolkit'
import countriesSlice from '../features/countries.scile'

export const store = configureStore({
    reducer: { country: countriesSlice },
})