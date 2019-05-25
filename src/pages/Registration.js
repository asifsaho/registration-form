import React, {Component} from 'react';
import {FormControl,
    FormLabel,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    withStyles,
    Typography,
    Container,
    Button,
    FormHelperText,
    Input,
    Grid
} from '@material-ui/core';

import DatePicker from '../components/DatePicker';

class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            country: '',
            firstName: '',
            lastName: '',
            passportNumber: '',
            passportIssueCountry: '',
            gender: '',
            nationality: '',
            dateOfBirth: '',
            passportValidity: ''
        }
    }


    handleChange = (event) => {
        //console.log({'Name': event.target.value, 'Value': event.target.value});
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleDatePickerChange = (name, value) => {
        //console.log({'Name': name, 'Value:': value.format()});

        this.setState({
            [name]: value.format()
        });
    };


    performRegistration = (event) => {
        event.preventDefault();
        console.log(this.state)
    };

    render() {
        const {classes} = this.props;

        return (
            <form onSubmit={this.performRegistration}>
                <Container maxWidth="md">
                    <Typography variant="h4">Please fill up the registration form</Typography>
                    <Grid container spacing={4}>
                        <Grid item md={4}>
                            <FormControl className={classes.field} error>
                                <TextField
                                    label="First Name *"
                                    value={this.state.firstName}
                                    name="firstName"
                                    type="text"
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormHelperText id="component-error-text">
                                    error
                                </FormHelperText>
                            </FormControl>
                            {/*Free text, validation against most common mistakes regarding a person’s name*/}
                        </Grid>

                        <Grid item md={4}>
                            <FormControl className={classes.field}>
                                <TextField
                                    label="Last Name *"
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormHelperText id="component-error-text">Error</FormHelperText>
                            </FormControl>
                            {/*Free text, validation against most common mistakes regarding a person’s name*/}
                        </Grid>

                        <Grid item md={4}>
                            <FormControl className={classes.field}>
                                <TextField
                                    label="Passport Number *"
                                    value={this.state.passportNumber}
                                    name="passportNumber"
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormHelperText id="component-error-text">Error</FormHelperText>
                                {/*Free text, validation against format*/}
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <Select
                                value={this.state.passportIssueCountry}
                                onChange={this.handleChange}
                                input={<Input name="passportIssueCountry"/>}
                                displayEmpty
                                name="passportIssueCountry"
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="">
                                    <em>Issuing Country *</em>
                                </MenuItem>
                                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item md={4}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Gender *</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.handleChange}>
                                    <FormControlLabel value="F" control={<Radio />} label="F" />
                                    <FormControlLabel value="M" control={<Radio />} label="M" />
                                    <FormControlLabel value="D" control={<Radio />} label="D" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <Select
                                value={this.state.nationality}
                                onChange={this.handleChange}
                                input={<Input name="nationality"/>}
                                displayEmpty
                                name="nationality"
                            >
                                <MenuItem value="">
                                    <em>Nationality *</em>
                                </MenuItem>
                                <MenuItem value="none"><em>Select one</em></MenuItem>
                                <MenuItem value="Bangladeshi">Bangladesh</MenuItem>
                                <MenuItem value="German">Germany</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Date Of Birth *</FormLabel>
                            <DatePicker name="dateOfBirth" handleDatePickerChange={this.handleDatePickerChange}/>
                            {/*Validation against upper and lower limits*/}
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Their passport expiration date *</FormLabel>
                            <DatePicker name="passportValidity" handleDatePickerChange={this.handleDatePickerChange}/>
                            {/*Validation against upper and lower limits and date of birth (cannot expire before birth)*/}
                        </Grid>

                        <Grid item md={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Registration
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        )
    }
}

const styles = {
    container: {
        maxWidth: 1200,
        margin: 'auto'
    },

    field: {
        width: '100%'
    }
};

export default withStyles(styles)(Registration)