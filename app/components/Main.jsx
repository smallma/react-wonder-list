import React from "react";
import { Link } from 'react-router';
import PureComponent from 'react-pure-render/component';

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

};


export default class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    var row = [];
    this.props.items.map(function(item) {

      const imageSrc = item.image && item.image.url();
      const subTitle = item.subtitle || '';
      const boughtStyles = item.hasBought ? styles.bought : styles.notBuy;
      const createdAt = new Date(item.createdAt);

      // console.log('createdAt: ' + createdAt.yyyymmdd());

      row.push(
        <div style={styles.item} className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div style={boughtStyles} className="row">
            <div style={styles.imgArea} className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <img style={styles.img} src={imageSrc}/>
            </div>
            <div style={styles.info} className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div>{item.name}</div>
              <div>{item.subTitle}</div>
              <div>NT ${item.price}</div>
              <div>{item.describe}</div>
              <div>Joined in {createdAt.toISOString().substring(0, 10)}</div>
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
