import React from "react";
import PureComponent from 'react-pure-render/component';

import TextField from 'material-ui/lib/text-field';
import Actions from "../actions/action";

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

  addPost(event) {
    event.preventDefault();
    let {name, subtitle, describe} = this.refs;
    Actions.addPost({
      name: name.value,
      subtitle: subtitle.value,
      describe: describe.value
    }).then(() => {
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
        <div style={styles.blockList}>
          <input style={styles.buttonStyle} type="submit" value="送出" />
        </div>
      </form>
    )
  }
};
