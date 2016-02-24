import React from "react";
import { Link } from 'react-router';
import PureComponent from 'react-pure-render/component';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '90%',
    margin: '0 auto',
    overflowY: 'auto',
    marginBottom: 24,
    textAlign: 'center',
  }
};


export default class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    var row = [];
    this.props.items.map(function(item) {

      const imageSrc = item.image && item.image.url();
      const bought = item.hasBought ? true : false;
      const subTitle = item.subtitle || '';

      row.push(
        <GridTile
          title={item.name + ' - ' + subTitle}
          subtitle={item.describe}
        >
          <div className="ui checkbox">
            <input id="fun" type="checkbox" checked={bought} />
            <label for="fun">Is bought</label>
          </div>
          <br/>
          <img src={imageSrc} />

        </GridTile>
      );
    });

    return (
       <GridList
        cellHeight={400}
        style={styles.gridList}>
        {row}
      </GridList>
    )
  }
};
