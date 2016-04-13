import React from "react";
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';

import IconButton from 'material-ui/lib/icon-button';
import SweetAlert from 'sweetalert-react';

import Actions from '../actions/action';


const styles = {
  container: {
    margin: '0 auto',
    maxWidth: 1300,
  },
  item: {
    marginTop: 20,
    padding: 40,
  },
  imgArea: {
    maxWidth: 200,
    margin: '0 auto 17px',
    textAlign: 'center'
  },
  img: {
    width: 150,
  },
  bought: {
    opacity: 0.3,
  },
  notBuy: {

  },
  info: {
    main: {
      maxWidth: 400,
    },
    class: {
      fontSize: 18,
    },
    name: {
      fontSize: 22,
    },
    Cost: {
      fontSize: 14,
    },
    describe: {
      marginTop: 6,
      fontSize: 14
    },
    date: {
      position: 'absolute',
      top: 0,
      right: 0,
      fontSize: 12,
      color: 'gray'
    }
  }
};

// export default class Main extends PureComponent {
export default class Main extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);

    this.state = {
      sweetAlertShow: false,
      clickItem: null
    };
  }

  _handleItemClick(item) {
    console.log('click item name: ' + item.name.trim());
    this.setState({
      sweetAlertShow: true,
      clickItem: item
    });
  }

  _getClassName(classes, classId) {
    let classname = '';
    classes.map(function(itemClass) {
      // console.log('Class obj: ' + JSON.stringify(itemClass));
/*      if (classId === itemClass.objectId) {
        classname = itemClass.name;
      }*/
      classname = classId === itemClass.objectId ? itemClass.name : '';
    });

    // console.log('className: ' + classname);
    return classname;
  }

  _setItemHasBought(hasBought) {
    event.preventDefault();
    var that = this;

    Actions.setItemHasBought(this.state.clickItem, hasBought)
    .then((obj) => {
      this.setState({ sweetAlertShow: false });
      that.props.history.pushState(null, '/');
    });
  }

  render() {
    let row = [];
    const that = this;
    const items = this.props.items || [];

    items.map(function(item) {

      const imageSrc = item.image && item.image.url();
      const subTitle = item.subtitle || '';
      const boughtStyles = item.hasBought ? styles.bought : styles.notBuy;
      const createdAt = new Date(item.createdAt);
      let itemClassName = ''

      if (item.classId && item.classId.objectId) {
        // console.log(item.classId.objectId);
        itemClassName = that._getClassName(that.props.classes, item.classId.objectId);
      }

      row.push(
        <div
          data-id={item.objectId}
          style={styles.item}
          key={item.objectId}
          onClick={that._handleItemClick.bind(that, item)}
          className="items col-xs-10 col-sm-10 col-md-6 col-lg-6">
          <div style={boughtStyles} className="row">
            <div style={styles.imgArea} className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <img style={styles.img} src={imageSrc}/>
            </div>
            <div style={styles.info.main} className="item__info col-xs-12 col-sm-8 col-md-8 col-lg-8">
              <div style={styles.info.class}>{itemClassName}</div>
              <div style={styles.info.name}>{item.name} - {item.subtitle}</div>
              <div style={styles.info.cost}>NT$ {item.price}</div>
              <div style={styles.info.describe}>{item.describe}</div>
              <br/>
              <div style={styles.info.date}>{createdAt.toISOString().substring(0, 10)}</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div style={styles.container} className="row">
          {row}
        </div>
        <div>
          <SweetAlert
            show={this.state.sweetAlertShow}
            title="Demo"
            text="SweetAlert in React"
            onConfirm={() => this._setItemHasBought(true)}
            onCancel={() => this._setItemHasBought(false)}
            title="Do you have it?"
            text="You can set this item has bought or not."
            type="warning"
            showCancelButton={true}
            confirmButtonColor="#DD6B55"
            confirmButtonText="Yes, has bought!"
            cancelButtonText="No, I don't have it!"
            closeOnConfirm={false}
            closeOnCancel={false}
          />
        </div>
      </div>
    )
  }
};
