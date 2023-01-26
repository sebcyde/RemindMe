import { configureStore } from '@reduxjs/toolkit';
import { NewLocationState } from './NewReminderSlice';

export const store = configureStore({
	reducer: {
		NewLocationState: NewLocationState.reducer,
		// NewReminderState: NewLocationstate.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
