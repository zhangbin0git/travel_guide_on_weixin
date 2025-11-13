import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelGuide, TravelDestination } from '../../types'

interface TravelState {
  destinations: TravelDestination[]
  guides: TravelGuide[]
  currentGuide: TravelGuide | null
  searchResults: TravelDestination[]
  loading: boolean
}

const initialState: TravelState = {
  destinations: [],
  guides: [],
  currentGuide: null,
  searchResults: [],
  loading: false,
}

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setDestinations: (state, action: PayloadAction<TravelDestination[]>) => {
      state.destinations = action.payload
    },
    setGuides: (state, action: PayloadAction<TravelGuide[]>) => {
      state.guides = action.payload
    },
    setCurrentGuide: (state, action: PayloadAction<TravelGuide>) => {
      state.currentGuide = action.payload
    },
    setSearchResults: (state, action: PayloadAction<TravelDestination[]>) => {
      state.searchResults = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  setDestinations,
  setGuides,
  setCurrentGuide,
  setSearchResults,
  setLoading,
} = travelSlice.actions

export default travelSlice.reducer
