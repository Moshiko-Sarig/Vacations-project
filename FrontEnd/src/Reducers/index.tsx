
import { combineReducers } from 'redux';
import LoggedReducer from './LoggedReducer';
import VacationReducer from './VacationReducer';


const allReducers = combineReducers({
    Logged: LoggedReducer ,
    Vacations :VacationReducer
});


export default allReducers;