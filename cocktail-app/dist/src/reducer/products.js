const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const INITIALIZE_ITEMS = "INITIALIZE_ITEMS";
// interface Product {
//   id: number;
//   type?: string;
//   name?: string;
//   description?: string;
//   alcohol?: string;
//   sugar?: string;
//   sourness?: string;
//   bitter?: string;
//   recipe?: string | null;
//   img?: string;
//   create_at?: string;
// }
export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: {
            item,
        },
    };
};
export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id,
    };
};
export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: { item },
    };
};
export const initializeItems = (items) => {
    return {
        type: INITIALIZE_ITEMS,
        payload: { items: items },
    };
};
const initialState = {
    products: [],
};
export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return Object.assign(Object.assign({}, state), { 
                // products: [...state.products, action.payload.item],
                products: [
                    ...state.products,
                    action.payload.item,
                ] });
        case INITIALIZE_ITEMS:
            return Object.assign(Object.assign({}, state), { products: action.payload.hasOwnProperty("items")
                    ? action.payload.items
                    : state.products });
        default:
            return state;
    }
}
