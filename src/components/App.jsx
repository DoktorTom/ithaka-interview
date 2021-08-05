import React from 'react';
import Images from './Images';
import testData from '../testData'
import Navigation from './Navigation';
import '../css/App.css';

// our "api"
// return pages+image ids on page that match a given query
function executeQuery(query) {

  if (query[0] === "") { // no query
    return getDataForPage(1); // reset back to first page
  }

  const toReturn = []

  // basically same logic as filter, but with each word of query
  for (var i = 0; i < testData[0].photos.photo.length; i += 1) {
    const photo = testData[0].photos.photo[i];
    for (const word of query) {
      if (photo.title.toLowerCase().includes(word)){
        toReturn.push(i); //because we're running on ids elsewhere in the app
        break; // already added the image no reason to check other query terms
      };
        if (photo.description._content.toLowerCase().includes(word)){
          toReturn.push(i);
          break;
      };
        if (photo.ownername.toLowerCase().includes(word)) {
          toReturn.push(i);
          break;
      };

    }
  }

  return { // return nothing because there is no search
    pages: 1,
    page: 1,
    perPage: 100,
    totalImgs: toReturn.length,
    ids: toReturn,
    max_allowed_results: 4000,
    max_allowed_pages: 40
  };
};

// returns numpages, current page, and ids for that page
function getDataForPage(pageNum) {

  if (pageNum > 2) pageNum = 2; // because we only have two pages

  return {
    pages: testData[pageNum-1].photos.pages,
    page: testData[pageNum-1].photos.page,
    perPage: testData[pageNum-1].photos.perPage,
    totalImgs: testData[pageNum-1].photos.total,
    ids: Array.from(Array(testData[pageNum-1].photos.photo.length).keys()),
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
      perPage: data.perPage
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
