import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
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
