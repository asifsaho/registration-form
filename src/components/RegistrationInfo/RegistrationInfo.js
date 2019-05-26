import React, {Component} from 'react';
import {
    withStyles,
    Button,
    Grid,
    Dialog,
    DialogTitle as MuiDialogTitle,
    DialogContent as MuiDialogContent,
    DialogActions as MuiDialogActions,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
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

const DialogTitle = withStyles(styles)(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class RegistrationInfo extends Component {
    render() {
        return (
            <div>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.showRegistrationInfo}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.hideRegistrationInfoModal}>
                        Show registration Information
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container>
                            {this.props.data.map((item, i) => (
                                <Grid item key={i} md={6}><p className={item.value.split(' ').join('')}>
                                    <strong>{item.label}</strong>: <span>{item.value}</span></p></Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.hideRegistrationInfoModal}
                                color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default RegistrationInfo;