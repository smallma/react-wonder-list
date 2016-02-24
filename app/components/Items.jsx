import React from 'react';
import $ from 'jquery';
import semantic from '../../semantic/out/semantic.js';

const Parse = require('parse').Parse;
const ParseReact = require('parse-react');
const Card = require('material-ui/lib/card/card');
// const CardActions = require('material-ui/lib/card/card-actions');
// const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');


const ItemsApp = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function() {
    return {
      items: (new Parse.Query('items')).ascending('createdAt')
    };
  },


  componentWillMount: function() {
    // const dispatch = this.props.dispatch;

    // function addTodo(text) {
    //     return {
    //         type: 'GET_ITEMS',
    //         payload: {
    //             text
    //         }
    //     };
    // }

    // // 實際發送 action
    // dispatch(addTodo('aaaa'));

    // $('.checkbox')
    //   .checkbox({
    //     // Fire on load to set parent value
    //     fireOnInit : true,
    //     // Change parent state on each child checkbox change
    //     onChange   : function() {
    //       var
    //         $listGroup      = $(this).closest('.list'),
    //         $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
    //         $checkbox       = $listGroup.find('.checkbox'),
    //         allChecked      = true,
    //         allUnchecked    = true
    //       ;
    //       console.log('isChecked: ' + $(this).checkbox('is checked'));
    //       // // check to see if all other siblings are checked or unchecked
    //       // $checkbox.each(function() {
    //       //   if( $(this).checkbox('is checked') ) {
    //       //     allUnchecked = false;
    //       //   }
    //       //   else {
    //       //     allChecked = false;
    //       //   }
    //       // });
    //       // // set parent checkbox state, but dont trigger its onChange callback
    //       // if(allChecked) {
    //       //   $parentCheckbox.checkbox('set checked');
    //       // }
    //       // else if(allUnchecked) {
    //       //   $parentCheckbox.checkbox('set unchecked');
    //       // }
    //       // else {
    //       //   $parentCheckbox.checkbox('set indeterminate');
    //       // }
    //     }
    //   })
    // ;
  },

  render: function() {
    const items = this.props.items || [];
    console.log(items);

    let row = [];
    this.data.items.map(function (item) {
      console.log('Date: ' + new Date(item.createdAt));
      // row.push(<div>{item.name}</div>);
      const bought = item.hasBought ? true : false;
      console.log(item.get('image'));
      row.push(
        <Card>
          <CardHeader
            title="Title"
            subtitle="Subtitle" />
          <CardMedia overlay={<CardTitle title={item.name} subtitle={item.subTitle} />}>
              <img src={item.get('image').url()}/>
          </CardMedia>
          <CardText>
              {item.describe}
              Joined in {new Date(item.createdAt).toString()}
          </CardText>
          <div className="extra content">
            <div className="ui checkbox">
              <input id="fun" type="checkbox" checked={bought} />
              <label for="fun">Is bought</label>
            </div>
          </div>

        </Card>

        // <div className="card">
        //   <div class="image">
        //     <img src={item.imageSrc} adlesse_been_here="true" />
        //   </div>
        //   <div className="content">
        //     <a className="header">{item.objectId} {item.name}</a>
        //     <div className="meta">
        //       <span className="date">Joined in {new Date(item.createdAt).toString()}</span>
        //    </div>
        //     <div className="description">
        //       {item.describe}
        //     </div>
        //   </div>
        //   <div className="extra content">
        //     <div className="ui checkbox">
        //         <input id="fun" type="checkbox" checked={bought} />
        //         <label for="fun">Is bought</label>
        //       </div>
        //   </div>
        // </div>
      );
    });

    return (
        <div className="items">
          <div className="ui link cards">
            {row}
          </div>
          <button className="1231" click="showItems">Click1</button>
        </div>
    );
  }
});

export default ItemsApp
