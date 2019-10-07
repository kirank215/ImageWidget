
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

