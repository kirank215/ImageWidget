
export const resetPreview = (event) => {
    const preview = document.getElementById("preview");
    preview.src= '';
}

export const validateURL = url => {
	if(url && url.match(/([a-z-_0-9/:.]*\.(jpg|jpeg|png|gif))/i) == null)
        return 'URL should contain an image';
    else
      	return undefined;
}
export const tobase64 = (file) => new Promise((resolve) => {
	const reader = new FileReader();
	reader.onload = () => resolve(reader.result);
	reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
	reader.readAsDataURL(file);
});

