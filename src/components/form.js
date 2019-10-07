import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm,SubmissionError,formValueSelector, reset} from 'redux-form';
import {resetPreview, validateURL, tobase64} from './validate'
import '../css/App.css'



class Myform extends Component {

    submit = async({url,upload}, dispatch) => {					// async as converting to base64 is not immediate
        if(!url && !upload) {
        	console.log('Enter a field');
        	throw new SubmissionError({
        		upload: 'Enter one of the fields!',
        		url: 'Enter one of the fields!',
        		_error: 'No entry!'
      		})
        }
        else {						// No errors
	        let file_base64: any;
			if(upload){
	        	file_base64 = await tobase64(upload);		// 'await' as the promise in tobase64 takes time to resolve
	        }
	        else if(url){
	        	const blob = await fetch(url).then(r => r.blob());		// converts url to blob
	        				// as readAsDataURL accepts only blob/file
	        	file_base64 = await tobase64(blob);
	        }
	        file_base64 = file_base64 ? file_base64 : " Could not convert to base64";
	        window.alert(`encoded Base64 string of the image:\n\n${JSON.stringify(file_base64, null, 2)}`);
	        dispatch(reset('myform'));
    	}
    };
 
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
			event.target.value = null;   			// helps on uploading same file twice after reset
        }
        else
            input.onChange(null);
    };

    onBlurURL = (event,input,invalid) => {
    	event.preventDefault();
    	if(invalid === false) {
    		const url = event.target.value;
    		const preview = document.getElementById("preview");
          //  preview.onload = () => {
         //   	}
            preview.src = url;
            preview.height = 200;

    	}
    }
    
    uploadrenderField = ({hasURL, label, type, input, meta: { invalid, error } }) => (
            <div>
            	<label className="textarea"> {label} </label>
            	<input className="textarea" name = {input.name} type={type} accept = '.jpeg, .png, .jpg, .gif'
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
        const {handleSubmit, reset, submitting,hasURL, hasUpload} = this.props;
        return (
                <div className="form">
                	<form onSubmit={handleSubmit(this.submit)}>

                		{!hasUpload && (<Field name="url" label="Url for the Image " 
                				validate={validateURL} component={this.urlrenderField} type="text"/>)}
                		{!hasURL && (<Field  name="upload" label="Upload the Image " type="file"
                				 component={this.uploadrenderField} />)}

                		<button type="submit" className="textarea"> Submit </button>
                		<button type="button" name="clearvalue" className="button"  onClick={reset} 
                				disabled={submitting}> Clear Values </button>

						<div className="ImagePreview">
                			<p > Image preview!</p>
							<img className="Image" id="preview" alt="No preview available"/>
							<div><button type="button" name="previewclear" onClick={resetPreview} 
									disabled={submitting}>Clear Preview </button></div>
                		</div>
                	</form>
                </div>
               );
    };
}
Myform = reduxForm({
	form: 'myform'
})(Myform);

const selector = formValueSelector('myform') 		// selector to see if url / file is uploaded
Myform = connect(state => {							// used to hide other type of input
	const hasURL = selector(state, 'url')
	const hasUpload = selector(state, 'upload')

    return {
   		hasURL,
   		hasUpload
  	}
})(Myform);


export default Myform;
