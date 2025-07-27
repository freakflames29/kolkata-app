import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import Reactotron from '../../ReactotronConfig';
import logger from 'redux-logger';

const createEnhancer = (getDefaultEnhancers: any) => {
  const reactrotron = Reactotron as any;
  return getDefaultEnhancers().concat(reactrotron.createEnhancer());
};

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),

  enhancers: createEnhancer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
