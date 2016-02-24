import React from 'react';
import PureComponent from 'react-pure-render/component';

import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const styles = {
  toolbar: {
  }
};

const iconStyles = {
  fontSize: '30px',
};


export default class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  goIndex(event) {
    event.preventDefault();
    window.location.href = "/#/";
  }

  goAddItem(event) {
    event.preventDefault();
    window.location.href = "/#/Add/";
  }

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup float="left">
          <ToolbarTitle
            onClick={this.goIndex.bind(this)}
            text="Wonder List" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <FontIcon
            onClick={this.goAddItem.bind(this)}
            className="fa fa-plus"
            style={iconStyles}
            color={Colors.lightBlue500}
            hoverColor={Colors.lightBlue900}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
};
