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
        //	if(isURL === false) {
        if(input.name === 'upload')
        {
            event.preventDefault();
            const image = event.target.files[0];
            console.log(input);
            if(image) {
                console.log(image);
                input.onChange(image);
            }
            else
                input.onChange(null);
        }

        //	}
    };

    validateURL = url => {
        if(url) {
            console.log(url);
            if(url.match(/([a-z-_0-9/:.]*\.(jpg|jpeg|png|gif))/i) == null)
                return 'URL should contain an image';
            else
                return 'Correct';
        }
    }

    onBlurURL = (event, input) => {
        console.log('The url is' + event.target.value);
        input.onBlur(event);

    };

    uploadrenderField = ({label, type, input, meta: { invalid, error } }) => (
            <div>
            <label> {label} </label>
            <input name = {input.name} type={type} accept = '.jpeg, .png'
            onChange={event => this.onChangeUpload(event,input)}/>
            {invalid && error && 
            <span className="error">{error}</span>}
            </div>
            );

    urlrenderField = ({label, type, input, meta: { invalid, error } }) => (
            <div>
            <label> {label} </label>
            <input name = {input.name} type={type}
            onBlur={event => this.onBlurURL(event,input)} />
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
                </form>
                </div>
               );
    };
}
Myform = reduxForm({
form: 'myform'
})(Myform);


export default Myform;
