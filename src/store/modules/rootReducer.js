import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth/reducer';
import teams from './teams/reducer';
import projects from './projects/reducer';
import members from './members/reducer';

export default combineReducers({
  auth,
  teams,
  projects,
  members,
  toastr,
});
