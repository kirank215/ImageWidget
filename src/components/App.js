import React from 'react';
import Myform from './form'
import "../css/App.css"

function App() {
	let submit = values => {
		console.log(values);
	}
  return (
    <div className="myapp">
        <h1> Welcome to my Image App </h1>
        <Myform onSubmit={submit}/>
    </div>
  );
}

export default App;
