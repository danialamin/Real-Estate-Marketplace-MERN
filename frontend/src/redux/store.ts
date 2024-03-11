import { EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction, configureStore } from "@reduxjs/toolkit"
import { reducer } from "./userSlice"

const store: EnhancedStore<{
  user: unknown;
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{
      user: unknown;
  }, undefined, UnknownAction>;
}>, StoreEnhancer]>>= configureStore({
  reducer: {
    user: reducer
  },
  // for putting serializable variables
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export {store}