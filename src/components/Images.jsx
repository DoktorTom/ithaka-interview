import React from 'react';
import Image from './Image';
import '../css/Images.css';


class Images extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: ""
        };
    }

    filter(image, query) {
        if (!query) {
            return true;
        }

        if (image.title.includes(query)) return true;
        if (image.description._content.includes(query)) return true;
        if (image.ownername.includes(query)) return true;


    }

    render() {
        return <div className="Images">
            <div className="Filter">
                <form className="Filter-form" onSubmit={(ev) => {
                ev.preventDefault();
            }}>
                    <input type="text" placeholder="filter this page" value={this.state.filter} onInput={(ev) => {
                        this.setState({filter: ev.target.value})
                    }}>

                    </input>
                </form>
            </div>
            <div className="Images-container">
                    {this.props.images.map(image => this.filter(image, this.state.filter) ? <Image data={image}/> : <></>)}
            </div>
        </div>
    }

}

export default Images;