A form using ReactJS/Redux

A simple form that takes an uploaded image or an image through url and provides a preview of the image. The image is submitted as a base64 string to the form. The base64 string is then displayed as an alert.

## Certain specifications.
- The url must link to an image. ( jpg/jpeg/png/gif )
- Press clear values to reselect. Remember, Image can be provided either through url or upload, not both!
- The preview is not always linked to the image selected. Clear preview to remove image.
- The form resets on submission

## Installation

 `git clone https://github.com/kirank215/ImageWidget.git` 

 `cd ImageWidget`

 `npm install`

 `npm run build`

 `npm install -g serve`

 `serve -s build`

You can now connect to the server displayed on terminal!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
