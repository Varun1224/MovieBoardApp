import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../actions";

//currently our state is an array. We'll convert it into an object.

const initialMovieState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = initialMovieState, action) {
  //   if (action.type === ADD_MOVIES) {
  //     return {
  //       ...state,
  //       list: action.movies,
  //     };
  //   }
  //   return state;

  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

//Here we are doing string comparisons, ideally we should avoid string comparisons. We should store this string in a variable so if the string is used in multiple places and we need to change the name of the string then we do not need to change the name of the string from all the places rather we just need to do it from one place. Also, try using switch as much as possible.

const initialSearchState = {
  result: {},
  showSearchResults: false,
};
export function search(state = initialSearchState, action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
        // movie-input.value="",
      };
    default:
      return state;
  }
}

// const initialRootState = {
//   movies: initialMovieState,
//   search: initialSearchState,
// };

// export default function rootReducer(state = initialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

// we do not need to create this method over here bcz this method is already created by redux and we can just import it from redux package, it's name is combineReducers. Now, we just call this function give it an object as argument and then we pass propertyNeeded: reducerResponsibleForThatProperty. Name of property and reducer is same so we can use shorthand property.

export default combineReducers({
  movies, //this is read by redux like this movies: movies(state.movies, action),
  search, // search: search(state.search, action),
});
