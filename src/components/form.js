import React from 'react';
import {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class Myform extends Component {

	 submit = values => {
		console.log(values);
	};

	onChange = (event, input) => {
		event.preventDefault();
		const image = event.target.files[0];
		if(image) {
			console.log(image);
			input.onChange(image);
		}
		else
			input.onChange(null);
	};

	 renderField = ({label, type, input, meta: { invalid, error } }) => (
	    <div>
	   	  <label> {label} </label>
	      <input name = {input.name} type={type} accept = '.jpeg, .png'
	      			onChange={event => this.onChange(event, input)} />
	      {invalid && error &&
	       		<span className="error">{error}</span>}
	    </div>
	 );

	render() {
		const {handleSubmit} = this.props;
		return (
			<div className="form">
				<h3> Here is a Form </h3>
				<form onSubmit={handleSubmit(this.submit)}>
					<Field name="url" label="Enter the url for the Image " component={this.renderField} type="text"/>
					<Field name="upload" label="Upload the Image " type="file" component={this.renderField}  />
					<button type="submit"> Submit </button>
				</form>
			</div>
		);
	};
}
Myform = reduxForm({
  form: 'myform'
})(Myform);


export default Myform;
