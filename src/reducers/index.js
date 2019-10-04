import reducer from './reducer';

import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

const allReducers = combineReducers ({
	myreducer: reducer,
	form: formReducer,
});

export default allReducers;