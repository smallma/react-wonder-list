import React from "react";
import PureComponent from 'react-pure-render/component';

import TextField from 'material-ui/lib/text-field';
import Actions from "../actions/action";
import Dropzone from 'react-dropzone';


const styles = {
  blockList: {
    marginBottom: "1rem"
  },
  titleStyle: {
    fontSize: "1.75rem"
  },
  inputStyle: {
    margin: "1rem 1.75rem",
    padding: ".25rem",
    lineHeight: "2.5rem",
    fontSize: "1.5rem",
    width: "60%"
  },
  buttonStyle: {
    padding: ".5rem 1rem",
    fontSize: "1.25rem",
    float: "right"
  }
}

export default class Main extends PureComponent {

  constructor(props) {
    super(props);
  }

  observe: function() {
    return {
      classes: (new Parse.Query('classes')).ascending('createdAt')
    };
  },

  // Save file to parse.com, base64 -> parse
  // http://stackoverflow.com/questions/31875762/upload-files-image-with-react-js-to-parse-cloud-class

  componentWillMount() {
    console.log('componentWillMount');
    this.imageBase64 = '';
  }

  onDrop(files) {
    if (files && files[0] ) {
      var FR = new FileReader();
      FR.onload = function(e) {
        console.log('base64: ' + e.target.result);
        this.imageBase64 = e.target.result;
      };
      FR.readAsDataURL(files[0]);
    }
  }

  addPost(event) {
    event.preventDefault();
    let {name, subtitle, describe} = this.refs;
    Actions.addItem({
      name: name.value,
      subtitle: subtitle.value,
      describe: describe.value
    }).then((obj1, obj2) => {
      console.log('obj1: ');
      console.log(obj1);
      obj1.objectId
      console.log('obj2: ');
      console.log(obj2);
      this.props.history.pushState(null, '/');
    });
  }

  render() {
    return (
      <form onSubmit={this.addPost.bind(this)}>
        <div style={styles.blockList}>
          <label style={styles.titleStyle}>物品主標題：</label><br />
          <input style={styles.inputStyle} ref="name" type="text" />
        </div>
        <div style={styles.blockList}>
          <label style={styles.titleStyle}>物品副標題：</label>
          <br />
          <textarea style={styles.inputStyle} ref="subtitle" />
        </div>
        <div style={styles.blockList}>
          <label style={styles.titleStyle}>物品描述：</label>
          <br />
          <textarea style={styles.inputStyle} ref="describe" />
        </div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div style={styles.blockList}>
          <input style={styles.buttonStyle} type="submit" value="送出" />
        </div>
      </form>
    )
  }
};
