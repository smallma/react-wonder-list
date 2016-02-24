const Parse = require('parse');

const initialState = { items: []};

function items(state = initialState, action) {
    switch (action.type) {
        case 'GET_ITEMS':
            console.log('GET_ITEMS');
            return {
                ...state,
                items: [
                    { name: 'a'},
                    { name: 'b'},
                    { name: 'c'}
                ]
            };
        // case REMOVE_ITEMS:
        //     return {
        //         ...state,
        //         items: state.items.filter(todo => todo.id !== action.payload)
        //     };
        default:
            console.log('default');
            return state;
    }
}

export default items;