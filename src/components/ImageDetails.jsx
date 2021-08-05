import React from 'react'
import "../css/ImageDetails.css"

class ImageDetails extends React.Component {

    constructor(props) {
        super(props)
        // because its not on the testData by default
        if (!this.props.data.comments) {
            this.props.data.comments = []
        }

        if (!this.props.data.has_faved) {
            this.props.data.has_faved = false;
        }

        this.state = {
            hasFaved: this.props.data.has_faved, // yes this is bad in react but just this once
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

        let countComments = parseInt(this.props.data.count_comments);

        return <div className="Details"> <h2 className="Details-title">{this.props.data.title}</h2>
        <table className="Details-table">
            <tbody>
            <tr>
                <th>Title:</th>
                <td>
                    <input type="text" value={this.props.data.title} size={this.props.data.title.length} disabled="true"/>
                </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <th style={this.descStyle}>Description:</th>
                <td>
                    <textarea style={this.descStyle} value={this.props.data.description._content} readOnly/>
                </td>
            </tr>
            </tbody>
            <tbody>
            <tr>
                <th>Public Domain:</th>
                <td>
                    <input type="checkbox" checked={this.props.data.ispublic} disabled={true}/>
                </td>
            </tr>
            </tbody>
        </table>
        <span className="Details-data">ID: {this.props.data.id}</span>
        <span className="Details-data">Owner: {this.props.data.ownername}</span>
        <span className="Details-data">Image Dimensions: {String(this.props.data.width_m)} x {String(this.props.data.height_m)}</span>
        <span className="Details-data">
            Faves: {faves}
            <button onClick={() => {
                this.setState({hasFaved: !this.state.hasFaved})
                this.props.data.has_faved = true;
                }}>
                    {this.state.hasFaved ? <>-</> : <>+</>}
            </button>
        </span>
        <span className="Details-data">
            Comments: {countComments}
            <div>
                <form className="Details-data" onSubmit={(ev) => {
                        this.props.data.comments.push({text: this.state.commentToAdd,
                        user: "You"});
                        this.props.data.count_comments = countComments + 1;
                        this.setState({commentToAdd: ""})
                        ev.preventDefault();
                    }}>
                        <input size="50" type="text" placeholder="add comment" disabled={this.props.data.can_comment === 0}
                        value={this.props.data.can_comment === 0 ? "You do not have permission to comment.": this.state.commentToAdd}
                        onChange={(ev) => {this.setState({commentToAdd: ev.target.value})}}/>
                </form>
                {this.props.data.comments.map((elt) => {return <span style={{float: "left", clear:"left"}}>{elt.user}: {elt.text}</span>})}
            </div>
        </span>
        <span className="Modal-buttons" style={{float: "right", clear: "left"}}>
            <button onClick={this.props.close}>cancel</button>
            <button disabled={true}>save</button>
        </span>
        </div>
    }

}

export default ImageDetails;