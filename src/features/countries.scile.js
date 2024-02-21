import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countriesData: [],
    regions: [
        { name: "Europe", id: '2' },
        { name: "Africa", id: '3' },
        { name: "Americas", id: '4' },
        { name: "Oceania", id: '5' },
        { name: "Asia", id: '6' },
    ],
    isLoading: true,
    url: 'https://restcountries.com/v3.1/all',
    searchCountries: [],
    selectedRegion: [],
    alertItem: [],
}

export const countriesSlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        loading: (state) => {
            state.isLoading = true
        },
        loaded: (state, action) => {
            state.isLoading = false
            state.countriesData = action.payload
        },
        error: (state) => {
            state.isLoading = false
        },
        setSearchCountries: (state, action) => {
            state.searchCountries = action.payload
        },
        setSelectedRegion: (state, action) => {
            state.selectedRegion = action.payload
        },
        setAlertItem: (state, action) => {
            state.alertItem = action.payload
        }
    }
})

export const { loaded, loading, error, setSearchCountries, setSelectedRegion, setAlertItem } = countriesSlice.actions
export default countriesSlice.reducer