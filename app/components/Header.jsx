import React from 'react';
// import PureComponent from 'react-pure-render/component';
import shallowCompare from 'react-addons-shallow-compare';
import materialDesignIcons from 'material-design-icons';

import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconButton from 'material-ui/lib/icon-button';
const colors = require('material-ui/lib/styles/colors.js');


const styles = {
  bartitle: {
    cursor: 'pointer'
  },
  toolbar: {
  },
  btn: {
    marginTop: 6
  },
  fontIcon: {
    fontSize: 25
  }
};

const iconStyles = {
  fontSize: '30px',
};


// export default class Header extends PureComponent {
export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);
  }

  goIndex(event) {
    event.preventDefault();
    window.location.href = '/#/';
  }

  goAddItem(event) {
    event.preventDefault();
    window.location.href = '/#/Add/';
  }

  render() {
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup float='left'>
          <ToolbarTitle
            style={styles.bartitle}
            onClick={this.goIndex.bind(this)}
            text='Wonder List' />
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <IconButton
            style={styles.fontIcon}
            tooltip='top-right'
            onClick={this.goAddItem.bind(this)}
            tooltipPosition='top-right'><i className="material-icons header_icon">add</i>
          </IconButton>

        </ToolbarGroup>
      </Toolbar>
    );
  }
};
