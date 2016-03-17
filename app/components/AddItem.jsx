import React from 'react';
import PureComponent from 'react-pure-render/component';

import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RaisedButton from 'material-ui/lib/raised-button';
const colors = require('material-ui/lib/styles/colors.js');

import Actions from '../actions/action';
import Dropzone from 'react-dropzone';

const styles = {
  blockList: {
    marginBottom: '1rem'
  },
  form: {
    margin: 40,
    width: 600,
    margin: '40px auto'
  },
  titleStyle: {
    fontSize: '1.75rem'
  },
  radioGroup: {
    margin: '30px 5% 0'
  },
  radioBtn: {
    float: 'left',
    display: 'inline-block',
    width: 150,
    height: 40,
    margin: '1rem auto',

  },
  textfield: {
    display: 'block',
    margin: '0 auto 1rem',
    width: '90%'
  },
  buttonStyle: {
    padding: '.5rem 1rem',
    fontSize: '1.25rem',
    float: 'right'
  },
  radioButton: {
    marginBottom: 16,
  },
  dropzoneArea: {
    marginTop: 70
  },
  dropzone: {
    paddingTop: 80,
    textAlign: 'center',
    width: '90%',
    height: 200,
    margin: '30px 5%',
    borderStyle: 'dashed',
    fontSize: 18
  },
  btnSubmitArea: {
    margin: '40px auto 0',
    textAlign: 'right',
  },
  btnSubmit: {
    backgroundColor: 'black'
  }
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

    const imageFile = new Parse.File('upload.jpg', {base64: imageBase64});

    imageFile.save()
      .then(function () {
        return ParseReact.Mutation.Set(item, {'primaryPhoto':imageFile}).dispatch();
      })
      .then(
        function () {
          return promise.resolve();
        },
        function (error) {
          console.log('Error');
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
      name: name.getValue(),
      subtitle: subtitle.getValue(),
      describe: describe.getValue(),
      classId: itemClassId
    }).then((obj) => {
      console.log('obj1: ');
      console.log(obj);

      console.log('that.imageBase64: ' + that.imageBase64);

      if (! that.imageBase64) {return Promise.resolve(); }

      const item = (new Parse.Query('items')).equalTo('objectId', obj.objectId);

      return that._uploadImage(item, that.imageBase64);
      // const imageFile = new Parse.File('upload.jpg', {base64: this.imageBase64});

    }).then(() => {
      this.props.history.pushState(null, '/');
    });
  }

  render() {
    let radioButtons = [];
    let first = true;

    this.props.classes.map(function(itemClass) {
      radioButtons.push(
        <RadioButton
          defaultChecked={first}
          name='itemClass'
          value={itemClass.objectId}
          label={itemClass.name}
          style={styles.radioBtn}
        />
      );

      if (first) { first = false; }

    });

    return (
      <form style={styles.form} onSubmit={this._addPost.bind(this)}>

        <TextField
          style={styles.textfield}
          hintText="物品主標題"
          errorText="This field is required"
          floatingLabelText="物品標題"
          ref='name'
        />
        <br/>

        <TextField
          style={styles.textfield}
          hintText="物品副標題"
          floatingLabelText="副標題"
          ref='subtitle'
        />
        <br/>

        <TextField
          style={styles.textfield}
          hintText="物品描述"
          floatingLabelText="描述"
          ref='describe'
        />
        <br/>

        <div style={styles.radioGroup}>
          <span>物品分類：</span>
          <RadioButtonGroup name='itemClass' ref='itemClass' defaultSelected='not_light'>
            {radioButtons}
          </RadioButtonGroup>
        </div>
        <br/>

        <div style={styles.dropzoneArea}>
          <Dropzone style={styles.dropzone} onDrop={this._onDrop.bind(this)}>
            <div>請把圖片拖曳到此框框中，或點擊框框內選擇檔案上傳</div>
          </Dropzone>
        </div>

        <div style={styles.btnSubmitArea}>
          <RaisedButton type="submit" label="送出" className="button-submit" primary={true} />
        </div>

      </form>
    )
  }
};
