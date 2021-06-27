import React from "react";
import "./embeded-page.scss"
class EmbededPage extends React.Component {
    render() {
        return <div className="embeded-page">
            <iframe src={this.props.src}></iframe>
        </div>;
    }
}

export default EmbededPage