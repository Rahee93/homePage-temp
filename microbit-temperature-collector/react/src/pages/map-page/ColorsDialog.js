import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Colors from './Colors';
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
  
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
    <Typography variant="h6">{children}</Typography>
    {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
        </IconButton>
    ) : null}
    </MuiDialogTitle>
  );
});
  
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class InfoDialog extends Component {
  render() {
    return (
      <Dialog
        fullWidth
        maxWidth = "sm"
        onClose={this.props.onClose}
        aria-labelledby="Colors" open={this.props.open}>
        <DialogTitle onClose={this.props.onClose}>
          Colors
        </DialogTitle>
        <DialogContent dividers>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.colorBlindMode}
              onChange={this.props.toggleColorBlidMode}
              color="primary"
            />
          }
          label={"Color Blind " + (this.props.colorBlindMode ? "On" : "Off")}
        />
        <Typography gutterBottom>Temperature to Color Table:</Typography>
        <Colors colorBlindMode={this.props.colorBlindMode}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InfoDialog;