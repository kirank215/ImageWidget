import React from 'react';
import {Component} from 'react';
import { Field, reduxForm,SubmissionError } from 'redux-form';
import '../css/App.css'


class Myform extends Component {

	tobase64 = (file) => new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
		reader.readAsDataURL(file);
	});

    submit = async({url,upload}) => {					// async as converting to base64 is not immediate
        if(!url && !upload) {
        	console.log('Enter a field');
        	throw new SubmissionError({
        		upload: 'Enter one of the fields!',
        		url: 'Enter one of the fields!',
        		_error: 'No entry!'
      		})   	
        }
        console.log(upload);
        let file_base64: any;

        if(upload){
        	file_base64 = await this.tobase64(upload);		// 'await' as the promise in tobase64 takes time to resolve
        }
        else if(url){
        	const blob = await fetch(url).then(r => r.blob());		// converts url to blob
        				// as readAsDataURL accepts only blob/file
        	file_base64 = await this.tobase64(blob);
        }
        console.log(file_base64);


    };

    reset = (event) => {
    	const preview = document.getElementById("preview");
    	preview.src= '';
    }
    onChangeUpload = async (event,input) => {
        event.preventDefault();
        const image = event.target.files[0];
        if(image) {
            const preview = document.getElementById("preview");
			const image_asURL = window.URL.createObjectURL(image);
			preview.onload = () => {
			    URL.revokeObjectURL(image);
			    input.onChange(image);
			}
			preview.src = image_asURL;

			console.log(event.target);
			console.log(event.target.value);
			event.target.value = null;   			// helps on uploading same file twice after clear
        }
        else
            input.onChange(null);
    };


    onBlurURL = (event,input,invalid) => {
    	event.preventDefault();
    	if(invalid === false) {
    		const url = event.target.value;
    		const preview = document.getElementById("preview");
            preview.onload = () => {
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
        const {handleSubmit, reset, submitting} = this.props;
        return (
                <div className="form">
                	<form onSubmit={handleSubmit(this.submit)}>
                		<Field name="url" label="Enter the url for the Image " 
                				validate={this.validateURL} component={this.urlrenderField} type="text"/>
                		<Field  name="upload" label="Upload the Image " type="file"
                				validate = {this.validateSize} component={this.uploadrenderField} />
                		<button type="submit" className="textarea"> Submit </button>
                		<button type="button" name="valueclear" onClick={reset} disabled={submitting}> 
                					Clear Values </button>

                		<div className="ImagePreview">
                		<p className="textarea" style={{textalign: "center"}}> Image preview!</p>
						<img id="preview" alt="preview" className="ImagePreview"/>
						<button type="button" name="previewclear" onClick={this.reset} disabled={submitting}> 
                					Clear Preview </button>
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
