import React from "react";
import { addMovieToList, handleMovieSearch } from "../actions";
import { connect } from "react-redux";
// import { connect } from "..";
// import { data } from "../data";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    console.log("inn");
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults: false,
    });
  };

  handleSearch = () => {
    const searchText = this.state.searchText;
    console.log("searchText", searchText);
    // const { dispatch } = this.props;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { result: movie, showSearchResults } = this.props.search; //here we just renamed the result to movie.
    // console.log("propsinsideNavbar", this.props);
    return (
      <div className="nav">
        <div className="logo">MOVIE BOARD</div>
        <div className="search-container">
          <input onChange={this.handleChange} className="movie-input" />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search} />
//         )}
//       </StoreContext.Consumer>
//     );
//   }
// }

// function mapStateToProp(state) {
//   return {
//     search:state.search,
//   }
// }
//We can destructure state over here only and write this function in short hand like this.
function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);
