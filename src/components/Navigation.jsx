import React from 'react';
import testData from '../testData';
import "../css/Navigation.css"


// mock for pagination API -> just return the same data again...
function getDataForPage(pageNum) {
  return {
    pages: testData.photos.pages,
    page: pageNum,
    perPage: testData.photos.perPage,
    totalImgs: testData.photos.total,
    ids: Array.from(Array(testData.photos.photo.length).keys()),
    max_allowed_results: 4000,
    max_allowed_pages: 40
  }
};

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.toFirstPage = this.toFirstPage.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.toNextPage = this.toNextPage.bind(this);
        this.toLastPage = this.toLastPage.bind(this);
    }

    

    toFirstPage() {

      let data = getDataForPage(1)
      this.props.stateHandler(data)
    }
    
      toPrevPage() {
        let data = getDataForPage(this.props.page - 1);
        this.props.stateHandler(data)
      }
    
      toNextPage() {
        let data = getDataForPage(this.props.page + 1);
        this.props.stateHandler(data)
      }
    
      toLastPage() {
        let data = getDataForPage(this.props.pages);
        this.props.stateHandler(data)
      }

    render() {
        return <div className="Navigation">
        <button className="Navigation-button" onClick={this.toFirstPage} disabled={!(this.props.page > 1)}>&lt;&lt;</button>
        <button className="Navigation-button" onClick={this.toPrevPage} disabled={!(this.props.page > 1)}>&lt;</button>
        <label className="Navigation-button" >page {this.props.page} of {this.props.pages}</label>
        <button className="Navigation-button" onClick={this.toNextPage} disabled={!(this.props.page < this.props.pages)}>&gt;</button>
        <button className="Navigation-button" onClick={this.toLastPage} disabled={!(this.props.page < this.props.pages)}>&gt;&gt;</button>
        </div>
    }

}

export default Navigation;