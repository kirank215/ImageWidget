

const reducer = (state = '', action) => {
	switch(action.type) {
		case 'ChangeState':
			return action.newState;
	 	default:
			return 'Hey';
		}
}

export default reducer;