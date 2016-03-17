import React from 'react';
import PureComponent from 'react-pure-render/component';

import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
const colors = require('material-ui/lib/styles/colors.js');


const styles = {
  bartitle: {
    cursor: 'pointer'
  },
  toolbar: {
  },
  btn: {
    marginTop: 6
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
            style={styles.bartitle}
            onClick={this.goIndex.bind(this)}
            text="Wonder List" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <FloatingActionButton
            disabledColor={colors.red200}
            disabled={true}
            mini={true}
            style={styles.btn}
            onClick={this.goAddItem.bind(this)}>
            <ContentAdd />
          </FloatingActionButton>

        </ToolbarGroup>
      </Toolbar>
    );
  }
};
