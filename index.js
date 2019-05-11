import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { types, onSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react';
import Document from './MSTFirestoreDocument';

const Todo = Document.mst(types.model("Todo", {
  title: types.string,
  done: false
}).actions(self => ({
  toggle() {
    self.done = !self.done
  }
})));
const todo = Todo.create({
  title: 'whoop'
});

const App = observer(class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  render() {
    const {visible} = this.state;
    return (
      <div>
        <p onClick={this.onClick}>
          Click me to toggle the visibility of the document
        </p>
        {visible ? <Hello todo={todo} /> : undefined}
      </div>
    );
  }

  onClick = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
});

render(<App />, document.getElementById('root'));
