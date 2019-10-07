import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider>, div);
  ReactDOM.render(<App />, div);
  ReactDOM.render(</Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
