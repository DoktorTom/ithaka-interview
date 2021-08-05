import React from 'react';
import ReactModal from 'react-modal';
import ImageDetails from './ImageDetails'
import "../css/Image.css"

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            url: "",
            url_cdn: "",

        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    componentDidMount() {

        if (this.props.data["url_sq"] === undefined) {
            // do something
            this.setState({url: ""})
        } else {
            this.setState({url: this.props.data.url_sq})
        }

    }

    // defaults change when put into .css file???
    modalStyle = {
        content: {
            margin: "auto",
            height: "750px",
            width: "500px",
        }
    }

    render() {

        // take out excess whitespace...
        var title = this.props.data.title.replace(/\s\s+\t/g, ' ');

        // if title is super long, chop off the end add elipses
        if (title.length > 15) {
            title = title.substr(0, 15);
            title = title + "..."
        }

        return  <div className="Image">
                    <img className="Image-image" src={this.props.data.url_m_cdn} alt="" onClick={this.openModal}
                    onError={
                        (ev) => {ev.target.src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/High-contrast-image-missing.svg/215px-High-contrast-image-missing.svg.png"}
                    }/>
                    <ReactModal isOpen={this.state.showModal} contentLabel="Image Modal" style={this.modalStyle}>
                        <button onClick={this.closeModal} style={{float: "right"}}>Close</button>
                        <ImageDetails data={this.props.data} close={this.closeModal}/>
                    </ReactModal>
                    <label className="Image-title">{title}</label>
                </div>
    }
}

export default Image;