import { USER_CREATE_REQUEST,
USER_CREATE_SUCCESS,
USER_CREATE_FAILURE,
USERS_FETCH_REQUEST,
USERS_FETCH_SUCCESS,
USERS_FETCH_FAILURE,
USERS_SELECT_PAGE,
USERS_INVALIDATE_PAGE } from '../actions/user';

export function usersSelectedPage(state = 1, action) {
  switch (action.type) {
    case USERS_SELECT_PAGE:
      return action.page
    default:
      return state;
  }
}

const initializeState = {
  isFetching: false,
  didInvalidate: false,
  total_users: 0,
  have_more: false,
  users: [],
  error: null
}

function users(state = initializeState, action) {
  switch (action.type) {
    case USERS_INVALIDATE_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case USERS_FETCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        have_more: false
      });
    case USERS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        total_users: action.total_users,
        users: action.users,
        have_more: action.have_more,
        error: null
      });
    case USERS_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        have_more: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function usersPage(state = {}, action) {
  switch (action.type) {
    case USERS_INVALIDATE_PAGE:
    case USERS_FETCH_REQUEST:
    case USERS_FETCH_SUCCESS:
    case USERS_FETCH_FAILURE:
      return Object.assign({}, state, {
        [action.page]: users(state[action.page], action)
      });
    default:
      return state;
  }
}

// Begin to create a new user
const initializeStateNewUser = {
  isLoading: false,
  created: false,
  newUser: null,
  error: null
}
export function newUser(state = initializeStateNewUser, action) {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case USER_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        created: true,
        newUser: action.newUser,
        error: null
      });
    case USER_CREATE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        created: false,
        newUser: null,
        error: action.error
      });
    default:
      return state;
  }
}
// End to create a new user