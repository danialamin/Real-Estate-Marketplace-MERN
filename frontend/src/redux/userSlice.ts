import { Draft, PayloadAction, Slice, SliceSelectors, createSlice } from "@reduxjs/toolkit";

const userSlice: Slice<{
  currentUser: null;
}, {
  setCurrentUser: (state: Draft<{
      currentUser: null;
  }>, action: {
      payload: PayloadAction;
      type: string;
  }) => void;
}, "user", "user", SliceSelectors<{
  currentUser: null;
}>> = createSlice({
  name: "user",
  initialState: {
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  }
})

const action = userSlice.actions.setCurrentUser
const reducer = userSlice.reducer
export { action, reducer }