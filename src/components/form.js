import React from 'react';
import {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import '../css/App.css'


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
        }
        else
            input.onChange(null);
    };


    onBlurURL = (event,input,invalid) => {
    	event.preventDefault();
    	if(invalid === false) {
    		const url = event.target.value;
    		const preview = document.getElementById("preview");
            preview.onload = function() {
            	}
            preview.src = url;
            preview.height = 75;
    	}
    }

    validateURL = url => {
        if(url) {
            if(url.match(/([a-z-_0-9/:.]*\.(jpg|jpeg|png))/i) == null)
                return 'URL should contain an image';
            else
      			return undefined;
        }
    }


    uploadrenderField = ({label, type, input, meta: { invalid, error } }) => (
            <div>
            	<label className="textarea"> {label} </label>
            	<input className="textarea" name = {input.name} type={type} accept = '.jpeg, .png'
            			onChange={event => this.onChangeUpload(event,input)}/>
            	{invalid && error &&
            			<span className="error">{error}</span>}
            </div>
            );

    urlrenderField = ({label, type, input , meta: { invalid, error } }) => (
            <div>
            	<label className="textarea"> {label} </label>
          		<input {... input} className="textarea" name = {input.name} type={type}
            			onBlur={event => this.onBlurURL(event,input,invalid)} />
            	{invalid && error &&
            			<span className="error">{error}</span>}
            </div>
            );

    render() {
        const {handleSubmit} = this.props;
        return (
                <div className="form">
                	<form onSubmit={handleSubmit(this.submit)}>
                		<Field  name="url" label="Enter the url for the Image " validate={this.validateURL} component={this.urlrenderField} type="text"/>
                		<Field  name="upload" label="Upload the Image " type="file" validate = {this.validateSize} component={this.uploadrenderField} />
                		<button type="submit" className="textarea"> Submit </button>
                		<div className="ImagePreview">
                		<p className="textarea" style={{textalign: "center"}}> Image preview here!</p>
                		<img id="preview" alt="preview" src="http://www.bondsloans.com/Content/Cms/news/9b985fa1-d7f8-4319-809a-5bfad28a2545.jpg" 
                			className="ImagePreview"
						/>
						</div>
                	</form>
                </div>
               );
    };
}
Myform = reduxForm({
form: 'myform'
})(Myform);


export default Myform;
