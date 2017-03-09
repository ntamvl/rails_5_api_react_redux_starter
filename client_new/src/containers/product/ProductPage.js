import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';

class ProductPage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Wellcome <strong>{this.props.user}</strong> to TeeWrap!!! :D</h1>
        </div>
      </div>
    )
  }
}

ProductPage.propTypes = {
  user: PropTypes.string
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  }
}

export default connect(mapStateToProps)(ProductPage);
