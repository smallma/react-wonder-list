import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Parse } from 'parse';

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
    maxWidth: 710,
    margin: '40px auto'
  },
  titleStyle: {
    fontSize: '1.75rem'
  },
  radioGroup: {
    margin: '30px 5% 0'
  },
  radioBtn: {
    // float: 'left',
    textAlign: 'left',
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
    position: 'relative'
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
  dropzonePreview: {
    position: 'absolute',
    top: 50,
    right: 39,
    width: 100,
  },
  btnSubmitArea: {
    margin: '40px auto 0',
    textAlign: 'right',
  },
  btnSubmit: {
    backgroundColor: 'black'
  }
}

// export default class Main extends PureComponent {
export default class AddItem extends React.Component {


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);

    this.state = {
      files: []
    };

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
    const that = this;

    if (files && files[0] ) {

      this.setState({
        files: files
      });

      var FR = new FileReader();
      FR.onload = function(e) {
        console.log('base64: ' + e.target.result);
        that.imageBase64 = e.target.result;
      };
      FR.readAsDataURL(files[0]);
    }
  }

  _uploadImage(itemObj, imageBase64, resolve) {
    const imageFile = new Parse.File('upload.jpg', {base64: imageBase64});

    return imageFile.save()
      .then(function (imageObj) {
        return Actions.addImage(itemObj, imageObj);
      })
      .then(function () {
        resolve();
      });
  }

  _getClassObj(classId) {
    let classObj;

    this.props.classes.map(function(itemClass) {
      console.log('Class obj: ' + JSON.stringify(itemClass));
      if (classId === itemClass.objectId) {
        classObj = itemClass;
      }
    });

    return classObj;
  }

  _addPost(event) {
    event.preventDefault();

    var that = this;
    let {name, subtitle, describe, itemClass, price} = this.refs;
    let itemObj;
    const itemClassId = itemClass.getSelectedValue();
    const classObj = this._getClassObj(itemClassId);
    const inputData = {
      name: name.getValue(),
      subtitle: subtitle.getValue(),
      describe: describe.getValue(),
      price: price.getValue() || 'N/A'
      // classId: itemClassId
    };

    function _asynAddImage(obj) {
      return new Promise((resolve, reject) => {
        if (!that.imageBase64){
          resolve();
        } else {
          return that._uploadImage(obj, that.imageBase64, resolve);
        }
      });
    };

    Actions.addItem(inputData)
    .then((obj) => {
      itemObj = obj;
      return _asynAddImage(obj);
    }).then((obj) => {
      return Actions.addRelationClass(itemObj, classObj);
    }).then((obj) => {
      that.props.history.pushState(null, '/');
    });
  }

  render() {
    const that = this;
    let radioButtons = [];

    this.props.classes.map(function(itemClass) {
      radioButtons.push(
        <RadioButton
          name='itemClass'
          key={itemClass.objectId}
          value={itemClass.objectId}
          label={itemClass.name}
          style={styles.radioBtn}
        />
      );
    });

    return (
      <form style={styles.form} onSubmit={this._addPost.bind(this)}>

        <div style={styles.radioGroup}>
          <span>物品分類：</span>
          <RadioButtonGroup name='itemClass' ref='itemClass' defaultSelected='DB7wb4qGmu'>
            {radioButtons}
          </RadioButtonGroup>
        </div>
        <br/>

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

        <TextField
          style={styles.textfield}
          hintText="物品價格"
          floatingLabelText="價格"
          ref='price'
        />
        <br/>

        <div style={styles.dropzoneArea}>
          <Dropzone style={styles.dropzone} onDrop={this._onDrop.bind(this)}>
            <div>請把圖片拖曳到此框框中，或點擊框框內選擇檔案上傳</div>
          </Dropzone>

          <div>{this.state.files.map((file) => <img style={styles.dropzonePreview} src={file.preview} /> )}</div>
        </div>


        <div style={styles.btnSubmitArea}>
          <RaisedButton type="submit" label="送出" className="button-submit" primary={true} />
        </div>

      </form>
    )
  }
};
