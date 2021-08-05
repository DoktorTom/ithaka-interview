import React from 'react';
import Image from './Image';
import '../css/Images.css';
import testData from '../testData'

function getImageData(imgId) {
    return testData[0].photos.photo[imgId];
}

// apparently js doesn't have built in arr comp
function compArrays(a, b) {
    var i = a.length > b.length ? a.length : b.length;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true

}

class Images extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: "",
            images: []
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (!compArrays(prevProps.imgIds, this.props.imgIds)) {
            const imageData = [];

            for (const idx of this.props.imgIds) {
                const temp = getImageData(idx);
                imageData.push(temp);
            }

            this.setState({
                images: imageData,
                filter: ""
            });
        }

        
    }

    componentDidMount() {

        const imageData = [];

        for (const idx of this.props.imgIds) {
            const temp = getImageData(idx);
            imageData.push(temp);
        }

        this.setState({
            images: imageData,
            filter: ""
        });


    }

    filter(image, query) {
        if (!query) {
            return true;
        }

        let normalizedQuery = query.toLowerCase();

        if (image.title.toLowerCase().includes(normalizedQuery)) return true;
        if (image.description._content.toLowerCase().includes(normalizedQuery)) return true;
        if (image.ownername.toLowerCase().includes(normalizedQuery)) return true;

        return false;

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
                    {this.state.images.map(image => {
                        return this.filter(image, this.state.filter) ? <Image key={image.id} data={image}/> : <></>;
                    })}
            </div>
        </div>
    }

}

export default Images;