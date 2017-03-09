import React from 'react';

const Feature = () => {
  return (
    <div className="container">
      <h1 className="display-3">Features</h1>
      <h3>What's New</h3>
      <p>
        When I started the project, I had to wrestle with Webpack and Babel to have the dev/build process work well.
        Recently I ported the starter kit to use
        {" "}
        <a
          href="https://github.com/facebookincubator/create-react-app/"
          target="_blank"
        >
          create-react-app
        </a>
        . I hope you will enjoy the "zero build configuration" experience as much as I do.
      </p>
    </div>
  );
};

export default Feature;
