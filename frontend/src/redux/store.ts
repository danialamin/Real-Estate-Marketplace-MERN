import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./userSlice"

const store = configureStore({
  reducer: {
    user: reducer
  },
  // for putting serializable variables
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export {store}