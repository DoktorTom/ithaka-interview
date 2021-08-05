import React from 'react';
import Images from './Images';
import testData from '../testData'
import Navigation from './Navigation';
import '../css/App.css';

// our "api"
// return pages+image ids on page that match a given query
function executeQuery(query) {

  if (query[0] === "") {
    return getDataForPage(1); // reset back to first page
  }
  return { // return nothing because there is no search
    pages: 0,
    page: 0,
    perPage: 0,
    totalImgs: 0,
    ids: [],
    max_allowed_results: 4000,
    max_allowed_pages: 40
  };
};

// returns numpages, current page, and ids for that page
function getDataForPage(pageNum) {
  return {
    pages: testData.photos.pages,
    page: testData.photos.page,
    perPage: testData.photos.perPage,
    totalImgs: testData.photos.total,
    ids: Array.from(Array(testData.photos.photo.length).keys()),
    max_allowed_results: 4000,
    max_allowed_pages: 40
  }
};

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      totalImgs: null,
      imgIds: null,
      currPage: 1,
      numPages: null,
      perPage: null,
      isLoaded: false,
      error: "",
      searchTerm: ""
    }

    this.stateHandler = this.stateHandler.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.searchTermChange = this.searchTermChange.bind(this);

  }

  stateHandler(data) {

    if (data.pages > data.max_allowed_pages) {
      data.pages = data.max_allowed_pages;
    }

    if (data.totalImgs > data.max_allowed_results) {
      data.totalImgs = data.max_allowed_results;
    }

    this.setState(
      {
        totalImgs: data.totalImgs,
        imgIds: data.ids,
        currPage: data.page,
        numPages: data.pages,
        perPage: data.perPage
      }
    );
  }

  // only fires once on load
  componentDidMount() {
    let data = getDataForPage(this.state.currPage)

    if (data.pages > data.max_allowed_pages) {
      data.pages = data.max_allowed_pages;
    }

    if (data.totalImgs > data.max_allowed_results) {
      data.totalImgs = data.max_allowed_results;
    }

    this.setState(
        {
          totalImgs: data.totalImgs,
          imgIds: data.ids,
          currPage: data.page,
          numPages: data.pages,
          perPage: data.perPage,
          isLoaded: true,
          error: ""
        }
      );
  }

  firstImageOnPage(page, perPage) {
    return (page - 1) * perPage + 1;
  }

  lastImageOnPage(page, perPage) {

    return page * perPage;
  }

  searchSubmit(event) {
    let searchTerms = this.state.searchTerm.split(" ");
    let data = executeQuery(searchTerms);

    if (data.pages > data.max_allowed_pages) {
      data.pages = data.max_allowed_pages;
    }

    if (data.totalImgs > data.max_allowed_results) {
      data.totalImgs = data.max_allowed_results;
    }

    this.setState({
      totalImgs: data.totalImgs,
      imgIds: data.ids,
      currPage: data.page,
      numPages: data.pages,
      perPage: data.perPage,
      searchTerm: ""
    })
    event.preventDefault();
  }

  searchTermChange(event) {
    this.setState({searchTerm: event.target.value})
  }


  render() {

    const {imgIds, currPage, numPages, totalImgs, error, isLoaded} = this.state;

    if (error) {
      return <div>Error...</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {

    return (
      <div className="App">
        <header className="App-header" >
          <h1>Image Gallery</h1>
          <div className="App-search">
            <form onSubmit={this.searchSubmit}>
              <label>Search: </label>
              <input type="text" value={this.state.searchTerm} onChange={this.searchTermChange} placeholder="keywords"/>
                {imgIds.length} of {totalImgs} images
            </form>
          </div>
        </header>
        {imgIds.length > 0 ? <Images imgIds={imgIds}/> : <></>}
        
        <Navigation page={currPage} pages={numPages}  stateHandler={this.stateHandler}/>
      </div>
    );
  };
}
}

export default App;
