const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const INITIALIZE_ITEMS = "INITIALIZE_ITEMS";

export const addItem = (item: Product) => {
  return {
    type: ADD_ITEM,
    payload: {
      item,
    },
  };
};

export const deleteItem = (id: number) => {
  return {
    type: DELETE_ITEM,
    payload: { id },
  };
};

export const updateItem = (item: Product) => {
  return {
    type: UPDATE_ITEM,
    payload: { item },
  };
};

export const initializeItems = (items: Product[]) => {
  return {
    type: INITIALIZE_ITEMS,
    payload: { items },
  };
};

// export type ProductActionsType = ReturnType<
//   | typeof addItem
//   | typeof deleteItem
//   | typeof updateItem
//   | typeof initializeItems
// >;

export type ProductActionsType =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof initializeItems>;

interface InitialiItems {}

interface Product {
  id: number;
  type?: string;
  name?: string;
  description?: string;
  alcohol?: string;
  sugar?: string;
  sourness?: string;
  bitter?: string;
  recipe?: string | null;
  img?: string;
  create_at?: string;
}

interface InitialType {
  products: Product[];
}

const initialState: InitialType = {
  products: [],
};

export default function productReducer(
  state = initialState,
  action: ProductActionsType
) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        products: [...state.products, action.payload],
      };
    case INITIALIZE_ITEMS:
      console.log("INITIALIZE_ITEMS");
      return {
        products: action.payload,
      };

    default:
      return state;
  }
}
