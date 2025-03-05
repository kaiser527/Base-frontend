import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import accountReducer from "./slice/AccountSlice";
import storage from "redux-persist/lib/storage";
import { getPersistConfig } from "redux-deep-persist";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { BLACKLIST_REDUCER } from "@/config/utils";
import userReducer from "./slice/userSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
});

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  blacklist: BLACKLIST_REDUCER,
  rootReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
