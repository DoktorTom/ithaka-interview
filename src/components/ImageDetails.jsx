import React from 'react'
import "../css/ImageDetails.css"

class ImageDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            hasFaved: false,
            comments: [],
            commentToAdd: ""
        }
    }

    descStyle = {
        verticalAlign: "top",
        resize: "none",
        rows: 4,
        cols: 25
    }


    render() {

        let faves = parseInt(this.props.data.count_faves);
        if (this.state.hasFaved) {
            faves = faves + 1;
        }

        let numComments = parseInt(this.props.data.count_comments);
        numComments = numComments + this.state.comments.length

        return <div className="Details"> <h2 className="Details-title">{this.props.data.title}</h2>
        <table className="Details-table">
            <tr>
                <th>Title:</th>
                <td>
                    <input type="text" value={this.props.data.title} size={this.props.data.title.length} disabled="true"/>
                </td>
            </tr>
            <tr>
                <th style={this.descStyle}>Description:</th>
                <td>
                    <textarea style={this.descStyle} value={this.props.data.description._content} readOnly/>
                </td>
            </tr>
            <tr>
                <th>Public Domain:</th>
                <td>
                    <input type="checkbox" checked={this.props.data.ispublic} disabled={true}/>
                </td>
            </tr>
        </table>
        <span className="Details-data">ID: {this.props.data.id}</span>
        <span className="Details-data">Owner: {this.props.data.ownername}</span>
        <span className="Details-data">Image Dimensions: {String(this.props.data.width_m)} x {String(this.props.data.height_m)}</span>
        <span className="Details-data">
            Faves: {faves}
            <button onClick={() => {this.setState({hasFaved: !this.state.hasFaved})}}>{this.state.hasFaved ? <>-</> : <>+</>}</button>
        </span>
        <span className="Details-data">
            Comments: {numComments}
            <div>
                <form className="Details-data" onSubmit={(ev) => {
                        let comments = this.state.comments;
                        comments.push(this.state.commentToAdd);
                        this.setState({commentToAdd: "", comments: comments})
                        ev.preventDefault();
                    }}>
                        <input size="50" type="text" placeholder="add comment" disabled={this.props.data.can_comment === 0}
                        value={this.props.data.can_comment === 0 ? "You do not have permission to comment.": this.state.commentToAdd}
                        onChange={(ev) => {this.setState({commentToAdd: ev.target.value})}}/>
                </form>
                {this.state.comments.map((elt) => {return <span style={{float: "left", clear:"left"}}>{elt}</span>})}
            </div>
        </span>
        </div>
    }

}

export default ImageDetails;