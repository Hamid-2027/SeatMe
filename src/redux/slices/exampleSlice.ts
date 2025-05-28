import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

// Define the state interface
interface ExampleState {
  value: string;
}

// Define the initial state
const initialState: ExampleState = {
  value: '',
};

// Create the slice
export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearValue: (state) => {
      state.value = '';
    },
  },
});

// Export the actions
export const { setValue, clearValue } = exampleSlice.actions;

// Export a selector to access the state
export const selectValue = (state: RootState) => state.example.value;

// Export the reducer
export default exampleSlice.reducer;
