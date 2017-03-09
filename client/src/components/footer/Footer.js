import React from "react";

import "./footer.scss";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="text-xs-center text-muted">
        Have questions or suggestions? Please file them on the
        {" "}<a
          href="https://github.com/ntamvl/rails_5_api_react_redux_starter/issues"
          target="_blank"
        >Github
        </a>{" "}
        or tweet
        <a href="http://www.twitter.com/nguyentamvn" target="_blank"> me</a>.
      </p>
    </div>
  </footer>
);

export default Footer;
