import React from 'react';
import {withStyles, FormControl, TextField, FormHelperText} from '@material-ui/core';

const InputTextField = props => (
    <div>
        <FormControl className={props.classes.field} error>
            <TextField
                label={props.label}
                value={props.value}
                name={props.name}
                type="text"
                placeholder={props.placeholder}
                onChange={props.handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {props.formErrors[props.name] && <FormHelperText>{props.errorMsg}</FormHelperText>}
        </FormControl>
    </div>
);


const styles = {
    container: {
        maxWidth: 1200,
        margin: 'auto'
    },

    field: {
        width: '100%'
    }
};


export default withStyles(styles)(InputTextField);