import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import Billreducer from './BillDataRedux';

const persistConfig = {
  key: 'root',
  storage, 
};

const persistedReducer = persistReducer(persistConfig, Billreducer);

const store = configureStore({
  reducer: {
    BillData: persistedReducer, 
  },
});

const persistor = persistStore(store);
export { store, persistor };
