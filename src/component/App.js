import React from "react";
import { data } from "../data";
import Navbar from "./Navbar.js";
import MovieCard from "./MovieCard.js";
import { addMovies, setShowFavourites } from "../actions";
import { connect } from "react-redux";
// import { connect } from "../index";

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props; //this is given just to make code look nicer. used while declaring dispatch.
    //we don't need this now since we are using dispatch from connect.
    //Now we'll make use of subscribe function. subscribe takes a function as a argument
    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate(); //this function updates store forcefully. we should avoid using it.
    // });
    //we don't need the subscribe because we have already subscribed in our index.js file of src folder.
    //Now, the flow is first the dispatch will be called then subscribe then get state line is called.
    //make api call
    //dispatch action
    //here, we were using object which we should avoid. So, we used a function so in future if it is used multiple times then the changes are to be made only ones not multiple times.
    this.props.dispatch(addMovies(data));

    console.log("STATE", this.props);
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      //found movie
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies, search } = this.props; //{movies:{}, search:{}}
    console.log("movies", movies);
    const { list, favourites, showFavourites } = movies;
    // console.log("STORE", this.props);
    console.log("render", this.props);
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          <div>
            {displayMovies.length === 0 ? (
              <div className="no-movies">No Movies to Display !</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
//Making wrappers around our components makes uor code complicated so rather thank using that we'll use connect.

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
//we passed this callback giving it the function name as callback but we changed it's name to mapStateToProps beacuse in react community we generally call it by that name beacuse we are amping the states to our props for this app component.
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
