import React from "react";
import PureComponent from 'react-pure-render/component';

import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

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
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  // observe() {
  //   return {
  //     classes: (new Parse.Query('classes')).ascending('createdAt')
  //   };
  // }

  // Save file to parse.com, base64 -> parse
  // http://stackoverflow.com/questions/31875762/upload-files-image-with-react-js-to-parse-cloud-class

  componentWillMount() {
    console.log('componentWillMount');
    this.imageBase64 = '';
  }

  _onDrop(files) {
    if (files && files[0] ) {
      var FR = new FileReader();
      FR.onload = function(e) {
        console.log('base64: ' + e.target.result);
        this.imageBase64 = e.target.result;
      };
      FR.readAsDataURL(files[0]);
    }
  }

  _uploadImage(item, imageBase64) {
    const promise = new Promise();

    const imageFile = new Parse.File("upload.jpg", {base64: imageBase64});

    imageFile.save()
      .then(function () {
        return ParseReact.Mutation.Set(item, {'primaryPhoto':imageFile}).dispatch();
      })
      .then(
        function () {
          return promise.resolve();
        },
        function (error) {
          console.log("Error");
          console.log(error);
          return promise.reject();
        }
      );

    return promise;
  }

  _addPost(event) {
    var that = this;

    event.preventDefault();
    let {name, subtitle, describe, itemClass} = this.refs;

    const itemClassId = itemClass.getSelectedValue();
    debugger;

    Actions.addItem({
      name: name.value,
      subtitle: subtitle.value,
      describe: describe.value,
      classId: itemClassId
    }).then((obj) => {
      console.log('obj1: ');
      console.log(obj);

      console.log('that.imageBase64: ' + that.imageBase64);

      if (! that.imageBase64) {return Promise.resolve(); }

      const item = (new Parse.Query('items')).equalTo('objectId', obj.objectId);

      return that._uploadImage(item, that.imageBase64);
      // const imageFile = new Parse.File("upload.jpg", {base64: this.imageBase64});

    }).then(() => {
      this.props.history.pushState(null, '/');
    });
  }

  render() {
    let classes = [];
    let first = true;

    this.props.classes.map(function(itemClass) {
      classes.push(
        <RadioButton
          defaultChecked={first}
          name="itemClass"
          value={itemClass.objectId}
          label={itemClass.name}
          style={styles.radioButton}
        />
      );

      if (first) { first = false; }

    });

    return (
      <form onSubmit={this._addPost.bind(this)}>
        <RadioButtonGroup name="itemClass" ref="itemClass" defaultSelected="not_light">
          {classes}
        </RadioButtonGroup>
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
        <Dropzone onDrop={this._onDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div style={styles.blockList}>
          <input style={styles.buttonStyle} type="submit" value="送出" />
        </div>
      </form>
    )
  }
};
