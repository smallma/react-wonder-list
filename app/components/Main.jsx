import React from "react";
import { Link } from 'react-router';
// import PureComponent from 'react-pure-render/component';
import shallowCompare from 'react-addons-shallow-compare';

import IconButton from 'material-ui/lib/icon-button';

// import GridList from 'material-ui/lib/grid-list/grid-list';
// import GridTile from 'material-ui/lib/grid-list/grid-tile';


const styles = {
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  // },
  // gridList: {
  //   width: '90%',
  //   margin: '0 auto',
  //   overflowY: 'auto',
  //   marginBottom: 24,
  //   textAlign: 'center',
  // }
  item: {
    marginTop: 20,
    padding: 40,
  },
  imgArea: {
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
  date: {
    textAlign: 'right',
    fontSize: 12,
    color: 'gray'
  },

};

// export default class Main extends PureComponent {
export default class Main extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // $('.items')

    console.log('')
    $(".items").off("click");
    $('.items').click(function () {
      console.log($(this).data('id'));


    });
  }


  render() {
    let row = [];
    const that = this;

    function _getClassName(classes, classId) {
      let classname = '';
      classes.map(function(itemClass) {
        console.log('Class obj: ' + JSON.stringify(itemClass));
        if (classId === itemClass.objectId) {
          classname = itemClass.name;
        }
      });

      console.log('className: ' + classname);
      return classname;
    }

    this.props.items.map(function(item) {

      const imageSrc = item.image && item.image.url();
      const subTitle = item.subtitle || '';
      const boughtStyles = item.hasBought ? styles.bought : styles.notBuy;
      const createdAt = new Date(item.createdAt);
      let itemClassName = ''

      if (item.classId && item.classId.objectId) {
        console.log(item.classId.objectId);
        itemClassName = _getClassName(that.props.classes, item.classId.objectId);
      }

      row.push(
        <div
          data-id={item.objectId}
          style={styles.item}
          key={item.objectId}
          className="items col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div style={boughtStyles} className="row">
            <div style={styles.imgArea} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <img style={styles.img} src={imageSrc}/>
            </div>
            <div style={styles.info} className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <div>{item.name} - {item.subtitle}</div>
              <div>{itemClassName}</div>
              <div>NT ${item.price}</div>
              <div >{item.describe}</div>
              <br/>
              <div style={styles.date}>Joined in {createdAt.toISOString().substring(0, 10)}</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {row}
      </div>
    )
  }
};
