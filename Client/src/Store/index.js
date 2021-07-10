import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk'
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
);
export default store