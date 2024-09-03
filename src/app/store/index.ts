import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './Root-Reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
	key: 'design System',
	storage: storage,
	blacklist: [''],
	wishListSlice: [''],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV === 'development',
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
