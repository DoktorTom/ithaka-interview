import React from 'react';
import testData from '../testData';
import "../css/Navigation.css"


// mock for pagination API -> just return the same data again...
function getDataForPage(page) {
    console.log("Getting data for page " + page)
    return testData
  }

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.toFirstPage = this.toFirstPage.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.toNextPage = this.toNextPage.bind(this);
        this.toLastPage = this.toLastPage.bind(this);
    }

    toFirstPage() {
        let data = getDataForPage(1);
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
        <button className="Navigation-button" onClick={this.props.toFirstPage}>&lt;&lt;</button>
        <button className="Navigation-button" onClick={this.props.toPrevPage}>&lt;</button>
        <label className="Navigation-button" >page {this.props.page} of {this.props.pages}</label>
        <button className="Navigation-button" onClick={this.toNextPage}>&gt;</button>
        <button className="Navigation-button" onClick={this.toLastPage}>&gt;&gt;</button>
        </div>
    }

}

export default Navigation;