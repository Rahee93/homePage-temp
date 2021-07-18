import React, { Component } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import Color from './Color';
export const colors = [
  {
    color: blue['700'],
    colorA: blue['A700'],
    min: Number.MIN_VALUE,
    max: -31,
    label: '< -30 °C'
  },
  {
    color: blue['400'],
    colorA: blue['A400'],
    min: -30,
    max: -21,
    label: '-21 °C ~ -30 °C'
  },
  {
    color: blue['200'],
    colorA: blue['A200'],
    min: -20,
    max: -11,
    label: '-11 °C ~ -20 °C'
  },
  {
    color: blue['100'],
    colorA: blue['A100'],
    min: -10,
    max: -1,
    label: '-1 °C ~ -10 °C'
  },
  {
    color: amber['100'],
    colorA: amber['A100'],
    min: 0,
    max: 10,
    label: '0 °C ~ 10 °C'
  },
  {
    color: amber['200'],
    colorA: amber['A200'],
    min: 11,
    max: 20,
    label: '11 °C ~ 20 °C'
  },
  {
    color: amber['400'],
    colorA: amber['A400'],
    min: 21,
    max: 30,
    label: '21 °C ~ 30 °C'
  },
  {
    color: amber['700'],
    colorA: amber['A700'],
    min: 31,
    max: Number.MAX_VALUE,
    label: '> 30 °C'
  }
];

export const findColor = (temeprature) => {
  const foundColor = colors.find((color) => {
    if(temeprature >= color.min && temeprature <= color.max){
      return true;
    }
  });
  if(!foundColor) {
    foundColor = {};
  }
  return foundColor;
}
class Colors extends Component {
  render() {
    return (
        <div style={{ width: '70%'}}>
        { colors.map((color, index) =>
          <Color key={index} color={this.props.colorBlindMode ? color.colorA : color.color} label={color.label}/>
        )}
        </div>
    );
  }
}

export default Colors;
