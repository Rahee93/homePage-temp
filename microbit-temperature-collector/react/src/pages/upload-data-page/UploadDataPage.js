import React from "react";
import { StylesProvider } from '@material-ui/core/styles';

class UploadDataPage extends React.Component {
    render() {
        return <div className="embeded-page">
            <iframe src={this.props.src}></iframe>
        </div>;
    }
}

export default UploadDataPage