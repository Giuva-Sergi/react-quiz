import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        cart: filteredCart,
        total: calculateNewTotal(filteredCart),
      };
    case "ADJUST_QUANTITY":
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.newQuantity }
          : item
      );
      return {
        cart: updatedCart,
        total: calculateNewTotal(updatedCart),
      };
    default:
      return state;
  }
}

function calculateNewTotal(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

const ShoppingCart = () => {
  const initialState = {
    cart: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { cart, total } = state;

  const addItemAction = (item) => ({
    type: "ADD_ITEM",
    payload: { ...item, quantity: 1 },
  });

  const removeItemAction = (itemId) => ({
    type: "REMOVE_ITEM",
    payload: itemId,
  });

  const adjustQuantityAction = (itemId, newQuantity) => ({
    type: "ADJUST_QUANTITY",
    payload: { itemId: itemId, newQuantity: newQuantity },
  });

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - ${item.price.toFixed(2)}{" "}
            each
            <button
              onClick={() =>
                dispatch(adjustQuantityAction(item.id, item.quantity - 1))
              }
            >
              Decrease Quantity
            </button>
            <button
              onClick={() =>
                dispatch(adjustQuantityAction(item.id, item.quantity + 1))
              }
            >
              Increase Quantity
            </button>
            <button onClick={() => dispatch(removeItemAction(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button
        onClick={() =>
          dispatch(addItemAction({ id: 1, name: "Product A", price: 10 }))
        }
      >
        Add Product A
      </button>
      <button
        onClick={() =>
          dispatch(addItemAction({ id: 2, name: "Product B", price: 15 }))
        }
      >
        Add Product B
      </button>
    </div>
  );
};

export default ShoppingCart;

// INSIDE THE REDUCER YOU HANDLE THE LOGIC
// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_NEW_ITEM":
//       return { ...state, newItem: action.payload };
//     case "ADD_ITEM":
//       if (!action.payload.text) return state;
//       return { ...state, items: [...state.items, action.payload], newItem: "" };
//     case "REMOVE_ITEM":
//       const filteredItems = state.items.filter(
//         (item) => item.id !== action.payload
//       );
//       return { ...state, items: filteredItems };
//     case "TOGGLE_COMPLETION":
//       return {
//         ...state,
//         items: state.items.map((item) =>
//           item.id === action.payload
//             ? { ...item, completed: !item.completed }
//             : item
//         ),
//       };
//     default:
//       return state;
//   }
// }

// const TodoList = () => {
//   const initialState = {
//     items: [],
//     newItem: "",
//   };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { items, newItem } = state;

//   // THIS REPRESENT THE ACTIONS THAT HAVE TO BE DISPATCHED TO THE REDUCER WITH THE SPECIFIC INFORMATIONS
//   const setNewItemAction = (newItem) => ({
//     type: "SET_NEW_ITEM",
//     payload: newItem,
//   });

//   const addItemAction = () => ({
//     type: "ADD_ITEM",
//     payload: { id: Date.now(), text: newItem, completed: false },
//   });

//   const removeItemAction = (itemId) => ({
//     type: "REMOVE_ITEM",
//     payload: itemId,
//   });

//   const toggleCompletionAction = (itemId) => ({
//     type: "TOGGLE_COMPLETION",
//     payload: itemId,
//   });

//   return (
//     <div>
//       <input
//         type="text"
//         value={newItem}
//         onChange={(e) => dispatch(setNewItemAction(e.target.value))}
//         placeholder="Add a new item"
//       />
//       <button onClick={() => dispatch(addItemAction())}>Add Item</button>

//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             <span
//               style={{
//                 textDecoration: item.completed ? "line-through" : "none",
//               }}
//             >
//               {item.text}
//             </span>
//             <button onClick={() => dispatch(removeItemAction(item.id))}>
//               Remove
//             </button>
//             <button onClick={() => dispatch(toggleCompletionAction(item.id))}>
//               {item.completed ? "Mark Incomplete" : "Mark Complete"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

// function reducer(state, action) {
//   switch (action.type) {
//     case "decrement":
//       return { ...state, count: state.count - state.step };
//     case "increment":
//       return { ...state, count: state.count + state.step };
//     case "setCount":
//       return { ...state, count: action.payload };
//     case "setStep":
//       return { ...state, step: action.payload };
//     case "reset":
//       return { count: 0, step: 1 };
//     default:
//       return state;
//   }
// }

// function DateCounter() {
//   const initialState = {
//     count: 0,
//     step: 1,
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { count, step } = state;

//   // This mutates the date object.
//   const date = new Date("june 21 2027");
//   date.setDate(date.getDate() + count);

//   const setStepAction = (e) => ({ type: "setStep", payload: +e.target.value });
//   const decrementAction = () => ({
//     type: "decrement",
//   });
//   const incrementAction = () => ({ type: "increment" });
//   const resetAction = () => ({
//     type: "reset",
//   });

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min="0"
//           max="10"
//           value={step}
//           onChange={(e) => dispatch(setStepAction(e))}
//         />
//         <span>{step}</span>
//       </div>

//       <div>
//         <button onClick={() => dispatch(decrementAction())}>-</button>
//         <input
//           value={count}
//           onChange={(e) =>
//             dispatch({
//               type: "setCount",
//               payload: !isNaN(+e.target.value) ? +e.target.value : "",
//             })
//           }
//         />
//         <button onClick={() => dispatch(incrementAction())}>+</button>
//       </div>

//       <p>{date.toDateString()}</p>

//       <div>
//         <button onClick={() => dispatch(resetAction())}>Reset</button>
//       </div>
//     </div>
//   );
// }
// export default DateCounter;
