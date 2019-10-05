import React from 'react';
import {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class Myform extends Component {

    submit = values => {
        /* 	if(!url.trim() && !image) {
            console.log(url);
            console.log(image);
            }
            else
            return 'Enter one field!'
         */
        console.log(values);
    };

    onChangeUpload = (event,input) => {
        if(input.name === 'upload')
        {
            event.preventDefault();
            const image = event.target.files[0];
            console.log(input);
            if(image) {
                console.log(image);
                const preview = document.getElementById("preview");
			    const image_asURL = window.URL.createObjectURL(image);
			    preview.onload = function() {
			    	URL.revokeObjectURL(image);
			    	input.onChange(image);
			    }
			    preview.src = image_asURL;
			    preview.height = 75;
            }
            else
                input.onChange(null);
        }
    };

    validateURL = url => {
        if(url) {
            console.log(url);
            if(url.match(/([a-z-_0-9/:.]*\.(jpg|jpeg|png))/i) == null)
                return 'URL should contain an image';
            else {
            	const preview = document.getElementById("preview");
            	//preview.onload = function() {
            	//	preview.src = img.src;
            	//}
            	preview.src = url;
            	preview.height = 75;
            	/*
            	const img = document.createElement("img");
			    img.src = window.URL.createObjectURL(url);
			    img.height = 60;
			    img.onload = function() {
			    	window.URL.revokeObjectURL(this.src);
      			}
      			*/
      			return 'Correct!'

            }
        }
    }


    uploadrenderField = ({label, type, input, meta: { invalid, error } }) => (
            <div>
            	<label> {label} </label>
            	<input name = {input.name} type={type} accept = '.jpeg, .png'
            			onChange={event => this.onChangeUpload(event,input)}/>
            	{invalid && error &&
            			<span className="error">{error}</span>}
            </div>
            );

    urlrenderField = ({label, type, input: { name, onBlur }, meta: { invalid, error } }) => (
            <div>
            	<label> {label} </label>
          		<input name = {name} type={type}
            			onBlur={event => onBlur(event)} />
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
                		<Field name="url" label="Enter the url for the Image " validate = {this.validateURL} component={this.urlrenderField} type="text"/>
                		<Field name="upload" label="Upload the Image " type="file" validate = {this.validateSize} component={this.uploadrenderField} />
                		<button type="submit"> Submit </button>
                		<img id="preview" />
                	</form>
                </div>
               );
    };
}
Myform = reduxForm({
form: 'myform'
})(Myform);


export default Myform;
