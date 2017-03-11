import { callApi } from "../utils/apiUtils";

export const USER_CREATE_REQUEST = "USER_CREATE_REQUEST";
export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
export const USER_CREATE_FAILURE = "USER_CREATE_FAILURE";

export const USERS_FETCH_REQUEST = "USERS_FETCH_REQUEST";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_FAILURE = "USERS_FETCH_FAILURE";
export const USERS_SELECT_PAGE = "USERS_SELECT_PAGE";
export const USERS_INVALIDATE_PAGE = "USERS_INVALIDATE_PAGE";

export function usersSelectPage(page) {
  return {
    type: USERS_SELECT_PAGE,
    page
  }
}

export function usersInvalidatePage(page) {
  return {
    type: USERS_INVALIDATE_PAGE,
    page
  }
}

function usersFetchRequest(page) {
  return {
    type: USERS_FETCH_REQUEST,
    page
  }
}

function usersFetchSuccess(page) {
  return (payload) => {
    return {
      type: USERS_FETCH_SUCCESS,
      page,
      users: payload.items,
      total_users: payload.total,
      have_more: payload.have_more
    }
  }
}

function usersFetchFailure(page) {
  return (error) => {
    return {
      type: USERS_FETCH_FAILURE,
      page,
      error
    }
  }
}

function fetchUsers(page) {
  const api_url = `/search/users?page=${page}`;
  return callApi(
    api_url,
    null,
    usersFetchRequest(page),
    usersFetchSuccess(page),
    usersFetchFailure(page)
  );
}

function shouldFetchUsers(state, page) {
  const users = state.usersPage[page];
  if (!users) {
    return true;
  }

  if (users.isFetching) {
    return false;
  }

  return users.didInvalidate;
}

export function fetchUsersIfNeed(page) {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState(), page)) {
      return dispatch(fetchUsers(page));
    }
  }
}

// Start to create a new user
function createUserRequest(user) {
  return {
    type: USER_CREATE_REQUEST,
    user
  }
}

function createUserSuccess(payload) {
  console.log("createUserSuccess");
  console.log(payload);
  return {
    type: USER_CREATE_SUCCESS,
    newUser: payload
  }
}

function createUserFailure(error) {
  return {
    type: USER_CREATE_FAILURE,
    error
  }
}

export function createUser(user) {
  const config = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
  }

  return callApi(
    "/api/signup",
    config,
    createUserRequest(user),
    createUserSuccess,
    createUserFailure
  );
}
// End to create a new user
