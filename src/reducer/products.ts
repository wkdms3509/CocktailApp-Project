const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const INITIALIZE_ITEMS = "INITIALIZE_ITEMS";

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
    payload: id,
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
    payload: { items: items },
  };
};

export type ProductActionsType =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof initializeItems>
  | ReturnType<typeof toggleBookmark>;

// interface InitialiItems {}

export interface InitialProductType {
  products: Product[];
}

const initialState: InitialProductType = {
  products: [],
};

export default function productReducer(
  state = initialState,
  action: ProductActionsType
): InitialProductType {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        // products: [...state.products, action.payload.item],
        products: [
          ...state.products,
          (action.payload as { item: Product }).item,
        ],
      };
    case INITIALIZE_ITEMS:
      return {
        ...state,
        products: action.payload.hasOwnProperty("items")
          ? (action.payload as { items: Product[] }).items
          : state.products,
      };

    default:
      return state;
  }
}
