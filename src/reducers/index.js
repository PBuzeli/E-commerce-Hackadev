import {
  ADD_TO_CART,
  CHANGE_ORDER_CART,
  CHANGE_QUANTITY,
  ADD_ADDRESS,
  SET_SHIP_ADDRESS,
  PLACE_ORDER,
  EMPTY_CART,
  REMOVE_ITEM,
  INIT_PRODUCTS,
} from '../actions';


const initialStateCart = {
  items: [],
};

const initialStateOrder = {
  items: [],
  shipping_change: 50,
  discount_in_percent: 10,
  shipping_address: '',
  total_items: 0,
  total_cost: 0,
};

const initialStateUser = {
  name: 'José da Silva',
  email: 'jose_silva@email.com',
  addresses: [
    {
      full_name: ' José da Silva',
      address: 'Av T63',
      number: 585,
      city: 'Goiânia',
      state: 'GO',
      pin_code: '75254-741',
      phone: '(62) 97990-1117',
    },
  ],
  orders: [],
};


const initState = { products: [] };
export const productReducer =  (state = initState, action) => {
  switch (action.type) {
    case INIT_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

const cartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.items.find((item) => item.id_product === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case CHANGE_QUANTITY:
      const oldItem = state.items.find((item) => item.id === action.payload.id);

      const index = state.items.indexOf(oldItem);
      const newItems = [...state.items];
      newItems[index] = action.payload;
      return { ...state, items: newItems };
    case REMOVE_ITEM:
      const item = action.payload;
      const i = state.items.findIndex((it) => it.id === item.id);
      const itemsArray = [...state.items];
      itemsArray.splice(i, 1);
      return { ...state, items: itemsArray };
    case EMPTY_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case CHANGE_ORDER_CART:
      const items = action.payload;
      const total_items = items.reduce(
        (total, item) => total + item.quantity * 1,
        0
      );
      const total_cost = items.reduce(
        (total, item) => total + item.product_price * item.quantity,
        0
      );
      return { ...state, items: action.payload, total_items, total_cost };
    case SET_SHIP_ADDRESS:
      return { ...state, shipping_address: action.payload };
    default:
      return state;
  }
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };
    case PLACE_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };

    default:
      return state;
  }
};
export { /* productReducer,  */cartReducer, orderReducer, userReducer };
