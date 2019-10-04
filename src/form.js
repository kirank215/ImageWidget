import React from 'react';

function Myform(){
	return (
		<div className="form">
			<h3> Here is a Form </h3>
			<form>
				<input name="Name" type="text" id="name" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Myform;