import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: '@Omninative',
      storage,
      whitelist: ['auth', 'teams', 'projects', 'members'],
    },
    reducers,
  );
  return persistedReducer;
};
