import React from 'react';

const sytles = {
  footer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -109
  }
}

export default React.createClass({
  render() {
    return (
      <footer style={sytles.footer}>
        <p className="text-center copyRight">@ 2015 smallma. All Rights Reserved.</p>
      </footer>
    );
  }
});
