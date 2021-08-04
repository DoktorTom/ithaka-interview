import React from 'react';
import Images from './Images';
import testData from '../testData'
import Navigation from './Navigation';
import '../css/App.css';

function getApiData() {
  return testData;
}

// TODO: create a dummy search results set...
function getSearchData(terms) {
  let toReturn = {};
  for (const term of terms) {
    for (const photo of testData.photos) {
      // do "searching" here -> basically the same as filtering...
    }    
  }
  return testData
}

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      data: "",
      isLoaded: false,
      error: "",
      searchTerm: null
    }

    this.stateHandler = this.stateHandler.bind(this);

  }

  stateHandler(data) {
    this.setState({data: data})
  }

  componentDidMount() {
    let data = getApiData()
    this.setState(
        {
          data: data,
          isLoaded: true,
          error: ""
        }
      );

    this.searchSubmit = this.searchSubmit.bind(this);
    this.searchTermChange = this.searchTermChange.bind(this);
  }

  firstImageOnPage(page, perpage) {
    return (page - 1) * perpage + 1;
  }

  lastImageOnPage(page, perpage) {

    return page * perpage;
  }

  searchSubmit(event) {
    console.log(this.state.searchTerm.split(" "))
    let data = getApiData();
    this.setState({
      data: data,
      searchTerm: ""
    })
    event.preventDefault();
  }

  searchTermChange(event) {
    this.setState({searchTerm: event.target.value})
  }


  render() {

    const {data, isLoaded, error} = this.state;

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
                {data.photos.perpage} of {data.photos.total} images
            </form>
          </div>
        </header>
        <Images images={data.photos.photo}/>
        <Navigation page={data.photos.page} pages={data.photos.pages}  stateHandler={this.stateHandler}/>
      </div>
    );
  };
}
}

export default App;
