import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./component/App";
import rootReducer from "./reducers";

// //function logger(obj, next, action)
// //logger(obj)(next)(action)
// //the cuuried function of logger function is this
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware code
//       console.log("ACTION_TYPE = ", action.type);
//       next(action);
//     };
//   };
// };
//since it's an implicit function. It can be written like this
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //logger code
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type);
    }
    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     //logger code
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }
//     next(action);
//   };
//But we do not need to create this thunk middleware beacuse there is a package called thunk middleware which we can install using command 'npm i redux-thunk' and then use this package.

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log("store", store);
console.log("state", store.getState());

//FROM HERE

// export const StoreContext = createContext();
// // console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// // const connectedAppComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }

//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//           //we used the spread operator here {...dataToBePassedAsProps} = movies = {movies} search= {search} which is stored by callback function as key:value pairs in our App.js
//         );
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

//TILL HERE. Hey, we need to remember this connect function and write this connect function in our every react app beacuse we need to connect our store to component in every app and so this is a problem again. we do not need to use context API or connect function or any other in our projects because it is already done for me by react package that is react-redux. just give command 'npm i react-redux' and include it.That's all.

//update store by dispatching actions
// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "superman" }],
// });
// console.log("AFTER STATE", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
