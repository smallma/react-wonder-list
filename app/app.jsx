import React from 'react';
import ReactDOM from 'react-dom';
import {Parse} from 'parse';
import ParseReact from 'parse-react';
let ParseComponent = ParseReact.Component(React);
import { Router, Route, IndexRoute } from 'react-router';

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./components/Main.jsx";
import AddItem from "./components/AddItem.jsx";
// import Main from './components/Main.jsx';


export default class App extends ParseComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastTime: new Date()
    };
  }
  observe(props, state) {
    Parse.initialize(
      'rXBTu9sVh0xaYH5aLChuCOKtYFyNlGqd4tJDZWbW',
      'MuJsVMhRQIo3AhFMcLMeGJQvAaC90TDFgfIzVbkA'
    );
    console.log('Get data!!');
    return {
      items: (new Parse.Query('items')).ascending('createdAt'),
      classes: (new Parse.Query('classes')).ascending('createdAt')
    };
  }
  render() {
    return (
      <div>
        <Header />
        <div>
          {React.cloneElement(this.props.children, {
            items: this.data && this.data.items,
            classes: this.data && this.data.classes
          })}
        </div>
        <Footer />
      </div>
    );
  }
};


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="Add" component={AddItem} />
  </Route>
);

ReactDOM.render(<Router routes={routes} />, document.getElementById("react"));