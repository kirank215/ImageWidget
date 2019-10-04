import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Myform = props => {
	const { handleSubmit } = props;
	return (
		<div className="form">
			<h3> Here is a Form </h3>
			<form onSubmit={handleSubmit}>
				<Field name="Name" component="input" type="text" id="name" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
Myform = reduxForm({
  // a unique name for the form
  form: 'myform'
})(Myform);


export default Myform;