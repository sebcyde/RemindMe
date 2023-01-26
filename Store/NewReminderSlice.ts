import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

export const NewLocationState = createSlice({
	name: 'NewLocation',
	initialState: {
		LocationData: {},
	},
	reducers: {
		UpdateLocationData: (
			state: { LocationData: GooglePlaceDetail | {} },
			action: PayloadAction<any>
		) => {
			state.LocationData = action.payload;
		},
	},
});

export const { UpdateLocationData } = NewLocationState.actions;
export default NewLocationState.reducer;
