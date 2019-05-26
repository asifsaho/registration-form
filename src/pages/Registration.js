import React, {Component} from 'react';
import {
    FormControl,
    FormLabel,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    withStyles,
    Typography,
    Container,
    Button,
    FormHelperText,
    Grid
} from '@material-ui/core';
import moment from 'moment';
import PassportIssueCountry from '../components/PassportIssueCountry/PassportIssueCountry';
import Nationality from '../components/Nationality/Nationality';
import DatePicker from '../components/DatePicker';
import ShowRegistrationInfo from '../components/ShowRegistrationInfo';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: 'Asif',
            lastName: 'Nawaz',
            passportNumber: 'BQ0622850',
            passportIssueCountry: {value: 'BD', label: 'Bangladesh'},
            gender: 'male',
            nationality: {value: 'Bangladeshi', label: 'Bangladeshi'},
            dateOfBirth: '',
            passportValidity: '',
            formErrors: {
                firstName: false,
                lastName: false,
                passportNumber: false,
                passportIssueCountry: false,
                gender: false,
                dateOfBirth: false,
                passportValidity: false,
                nationality: false
            },
            showRegistrationInfo: false
        }
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        console.log({'Name': event.target.name, 'Value': event.target.value});

        this.setState({
            [name]: value
        });


        switch (name) {
            case "firstName" :
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: (!value.length || value.length > 8)
                    })
                });

                break;

            case "lastName":
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: (!value.length || value.length > 8)
                    })
                });

                break;

            case "passportNumber":
                const noSpecialCharRegex = RegExp('[^A-Za-z0-9]', 'g');
                const containNumberRegex = RegExp('[0-9]', 'g');
                const containAlphabetRegex = RegExp('[A-Za-z]', 'g');

                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: (!value.length || !containNumberRegex.test(value) || !containAlphabetRegex.test(value) || noSpecialCharRegex.test(value) || value.length !== 9)
                    })
                });

                break;

            case "dateOfBirth":
                const formatRegex = RegExp('^[0-9]{4}\\.[0-9]{1,2}\\.[0-9]{1,2}$', 'g');

                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: (!value.length || !formatRegex.test(value) || !moment(new Date(value)).isValid() || !(moment(new Date(value)).diff('1919-01-01', 'days') > 0) || !!(moment(new Date(value)).diff(new Date(), 'days') > 0))
                    })
                });

                // console.log({ // True means pass
                //     'Format check': formatRegex.test(value),
                //     'length': !!value.length,
                //     'Is Valid': moment(new Date(value)).isValid(),
                //     'Not Older than 1919': (moment(new Date(value)).diff('1919-01-01', 'days') > 0),
                //     'Date Not after today': !(moment(new Date(value)).diff(new Date(), 'days') > 0)
                // });

                break;

            default:
                return;
        }
    };

    performRegistration = (event) => {
        event.preventDefault();

        this.setState({
            showRegistrationInfo: true
        })
    };

    disableSubmit = () => {
        const {state} = this;

        return (
            // Check values
            !state.firstName.length ||
            !state.lastName.length ||
            !state.passportNumber.length ||
            !state.passportIssueCountry.value.length ||
            !state.gender.length ||
            !state.nationality.value.length ||
            !+state.dateOfBirth ||
            !+state.passportValidity ||

            // Check Errors
            state.formErrors.firstName ||
            state.formErrors.lastName ||
            state.formErrors.passportNumber ||
            state.formErrors.passportIssueCountry ||
            state.formErrors.gender ||
            state.formErrors.nationality ||
            state.formErrors.dateOfBirth ||
            state.formErrors.passportValidity
        )
    };

    render() {
        const {classes} = this.props;
        const {formErrors} = this.state;

        return (
            <>
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
                                {formErrors.firstName && <FormHelperText>
                                    First Name shouldn't be more than 8 character long.
                                </FormHelperText>}
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
                                {formErrors.lastName && <FormHelperText error>
                                    Last Name shouldn't be more than 8 character long.
                                </FormHelperText>}
                            </FormControl>
                            {/*Free text, validation against most common mistakes regarding a person’s name*/}
                        </Grid>

                        <Grid item md={4}>
                            <FormControl className={classes.field} error>
                                <TextField
                                    label="Passport Number *"
                                    value={this.state.passportNumber}
                                    name="passportNumber"
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {formErrors.passportNumber && <FormHelperText>
                                    The passport number should contain both letters and numbers without any special
                                    character and should not be great than 9 character
                                </FormHelperText>}
                                {/*Free text, validation against format*/}
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Passport Issuing Country *</FormLabel>
                            <PassportIssueCountry value={this.state.passportIssueCountry}
                                                  name="passportIssueCountry"
                                                  handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Gender *</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.handleChange}>
                                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                    <FormControlLabel value="Others" control={<Radio/>} label="Other"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Nationality *</FormLabel>
                            <Nationality value={this.state.nationality}
                                         name="nationality"
                                         handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Date Of Birth *</FormLabel>
                            <FormControl component="fieldset" className={classes.formControl} error>
                                <TextField className={classes.field}
                                           name="dateOfBirth"
                                           placeholder="YYYY.MM.DD"
                                           value={this.state.dateOfBirth}
                                           onChange={this.handleChange}/>

                                {formErrors.dateOfBirth && <FormHelperText>
                                    The date of birth should be in YYYY-MM-DD format and should not be older than 1919 and after today
                                </FormHelperText>}
                            </FormControl>
                        </Grid>


                        <Grid item md={4}>
                            <FormLabel component="legend">Date Of Birth *</FormLabel>
                            <FormControl component="fieldset" className={classes.formControl} error>
                                <TextField className={classes.field}
                                           name="passportValidity"
                                           placeholder="YYYY.MM.DD"
                                           value={this.state.passportValidity}
                                           onChange={this.handleChange}/>

                                {formErrors.passportValidity && <FormHelperText>
                                    The expiry date should be in YYYY-MM-DD format and should not be before date of birth
                                </FormHelperText>}
                                {/*Validation against upper and lower limits and date of birth (cannot expire before birthday*/}
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <Button type="submit" disabled={this.disableSubmit()} variant="contained" color="primary">
                                Registration
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>

            {this.state.showRegistrationInfo && <ShowRegistrationInfo data={[
                {label: 'First Name', value: this.state.firstName},
                {label: 'Last Name', value: this.state.lastName},
                {label: 'Passport Number', value: this.state.passportNumber},
                {label: 'Passport Issue Country', value: this.state.passportIssueCountry.label},
                {label: 'Gender', value: this.state.gender},
                {label: 'Nationality', value: this.state.nationality.label},
                {label: 'Date Of Birth', value: moment(this.state.dateOfBirth).format('DD.MM.YYYY')},
                {label: 'Passport Validity', value: moment(this.state.passportValidity).format('DD.MM.YYYY')}
            ]}/>}
            </>
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