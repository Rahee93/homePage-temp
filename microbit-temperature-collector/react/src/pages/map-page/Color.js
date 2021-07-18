import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
class Color extends Component {
    render() {
      return (
          <div style={{backgroundColor: this.props.color, padding: '15px'}}>
              <Typography>
                {this.props.label}
              </Typography>
          </div>
      );
    }
  }
  
  export default Color;