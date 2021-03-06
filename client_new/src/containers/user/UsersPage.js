import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import classNames from 'classnames';
import { v4 } from 'node-uuid';
import { withRouter } from 'react-router';
import { addQuery } from '../../utils/utils-router';

import { usersSelectPage, fetchUsersIfNeed, usersInvalidatePage } from '../../actions/user';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchUsersIfNeed(page));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      const { dispatch, page } = nextProps;
      dispatch(fetchUsersIfNeed(page));
    }
    if (nextProps.newUser) {
      const { dispatch, page } = nextProps;
      dispatch(usersInvalidatePage(page));
      dispatch(fetchUsersIfNeed(page));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
   return true;
  }

  handlePreviousPageClick(e) {
    e.preventDefault();
    const { page, dispatch } = this.props;
    const page_num = parseInt(page, 10);
    if (page > 1) {
      dispatch(usersSelectPage(page_num - 1));
      addQuery({ page: page_num - 1 })
    }
  }

  handleNextPageClick(e) {
    e.preventDefault();
    const { page, dispatch, users } = this.props;
    const page_num = parseInt(page, 10);
    if (users.length > 0) {
      dispatch(usersSelectPage(page_num + 1));
      addQuery({ page: page_num + 1 })

      // this.context.history.push({
      //   ...this.props.location,
      //   query: Object.assign({}, this.props.location.query, {foo:"bar"})
      // });
    }
  }

  handleRefresh(e) {
    e.preventDefault();
    const { page, dispatch } = this.props;
    const page_num = parseInt(page, 10);
    dispatch(usersInvalidatePage(page_num));
    dispatch(fetchUsersIfNeed(page_num));
  }

  render() {
    const { page, users, isFetching, have_more } = this.props;
    const page_num = parseInt(page, 10);
    const prevStyles = classNames("page-item", { disabled: page_num <= 1 });
    const nextStyles = classNames("page-item", {
      disabled: !have_more
    });

    return (
      <div className="container">
        <Link className="btn btn-success pull-right" to="/signup">Create user</Link>
        <nav>
          <ul className="pagination pagination-sm">
            <li className={prevStyles}>
              <a
                className="page-link"
                href="#"
                onClick={this.handlePreviousPageClick}>
                <span>Previous</span>
              </a>
            </li>

            {!isFetching &&
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.handleRefresh}>
                  Refesh page {page_num}
                </a>
              </li>
            }

            {isFetching &&
              <li className="page-item">
                <span className="page-link">
                  <i className="fa fa-refresh fa-spin"></i> Refeshing...
                </span>
              </li>
            }

            <li className={nextStyles}>
              <a
                className="page-link"
                href="#"
                onClick={this.handleNextPageClick}>
                <span>Next</span>
              </a>
            </li>
          </ul>
        </nav>
        {users.length > 0 &&
          users.map(user => (
            <div key={v4()} className="row">
              <div className="col-md-12">
                <h3>{user.name}</h3>
                <p><em>{user.email}</em></p>
                <hr/>
              </div>
            </div>
          ))
        }
        {users.length === 0 &&
          <h3>No data</h3>
        }
      </div>
    );
  }
}

UsersPage.propsTypes = {
  page: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  have_more: PropTypes.bool,
  location: PropTypes.object
}

function mapStateToProps(state, props) {
  const { usersSelectedPage, usersPage } = state;
  var page = usersSelectedPage || 1;
  const current_page = parseInt(props.location.query.page, 10);
  if (current_page) {
    page = current_page;
  }

  if (!usersPage || !usersPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      total_users: 0,
      have_more: true,
      users: [],
      error: null
    }
  }

  return {
    page,
    isFetching: usersPage[page].isFetching,
    didInvalidate: usersPage[page].didInvalidate,
    total_users: usersPage[page].total_users,
    users: usersPage[page].users,
    error: usersPage[page].error,
    have_more: usersPage[page].have_more
  }
}

export default withRouter(connect(mapStateToProps)(UsersPage));
