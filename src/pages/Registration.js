import React, {Component} from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    withStyles,
    Typography,
    Container,
    Button,
    Grid
} from '@material-ui/core';
import moment from 'moment';
import InputTextField from '../components/InputTextField';
import PassportIssueCountry from '../components/PassportIssueCountry/PassportIssueCountry';
import Nationality from '../components/Nationality/Nationality';
import validator from '../utils/validator';
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
            dateOfBirth: '1992.08.09',
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
            showRegistrationInfo: false,
        }
    }

    showRegistrationInfoModal = () => {
        this.setState({
            showRegistrationInfo: true,
        });
    };

    hideRegistrationInfoModal = () => {
        this.setState({
            showRegistrationInfo: false
        });
    };


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
                        [name]: validator.firstName(value)
                    })
                });

                break;

            case "lastName":
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: validator.lastName(value)
                    })
                });

                break;

            case "passportNumber":
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: validator.passportNumber(value)
                    })
                });

                break;

            case "dateOfBirth":
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: validator.dateOfBirth(value)
                    })
                });

                // console.log({ // All True means pass
                //     'Format check': formatRegex.test(value),
                //     'length': !!value.length,
                //     'Is Valid': moment(new Date(value)).isValid(),
                //     'Not Older than 1919': (moment(new Date(value)).diff('1919-01-01', 'days') > 0),
                //     'Date Not after today': !(moment(new Date(value)).diff(new Date(), 'days') > 0)
                // });

                break;

            case "passportValidity":
                this.setState({
                    formErrors: Object.assign(this.state.formErrors, {
                        [name]: validator.passportValidity(value, this.state.dateOfBirth)
                    })
                });

                // console.log({ // All True means pass
                //     'Date Of Birth': this.state.dateOfBirth,
                //     'Format check': PVformatRegex.test(value),
                //     'length': !!value.length,
                //     'Is Valid': moment(new Date(value)).isValid(),
                //     'Not Older than Date Of Birth': (moment(new Date(value)).diff(moment(new Date(this.state.dateOfBirth)), 'days') > 0)
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
            !state.dateOfBirth.length ||
            !state.passportValidity.length ||

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

        const {
            formErrors,
            firstName,
            lastName,
            passportNumber,
            passportIssueCountry,
            gender,
            nationality,
            dateOfBirth,
            passportValidity
        } = this.state;

        return (
            <>
            <form onSubmit={this.performRegistration}>
                <Container maxWidth="md">
                    <Typography variant="h4">Please fill up the registration form</Typography>
                    <Grid container spacing={4}>
                        <Grid item md={4}>
                            <InputTextField value={firstName}
                                            formErrors={formErrors}
                                            name="firstName"
                                            placeholder="John"
                                            label="First Name *"
                                            errorMsg="First Name shouldn't be more than 8 character long."
                                            handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <InputTextField value={lastName}
                                            formErrors={formErrors}
                                            name="lastName"
                                            placeholder="Doe"
                                            label="Last Name *"
                                            errorMsg="Last Name shouldn't be more than 8 character long."
                                            handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <InputTextField value={passportNumber}
                                            formErrors={formErrors}
                                            name="passportNumber"
                                            placeholder="BQ0622850"
                                            label="Passport Number *"
                                            errorMsg="The passport number should contain both letters and numbers without any special"
                                            handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Passport Issuing Country *</FormLabel>
                            <PassportIssueCountry value={passportIssueCountry}
                                                  name="passportIssueCountry"
                                                  handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Gender *</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={gender}
                                    onChange={this.handleChange}>
                                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                    <FormControlLabel value="Others" control={<Radio/>} label="Other"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={4}>
                            <FormLabel component="legend">Nationality *</FormLabel>
                            <Nationality value={nationality}
                                         name="nationality"
                                         handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={4}>
                            <InputTextField value={dateOfBirth}
                                            formErrors={formErrors}
                                            name="dateOfBirth"
                                            label="Date Of Birth *"
                                            placeholder="YYYY.MM.DD"
                                            errorMsg="The date of birth should be in YYYY-MM-DD format and should not be older than 1919 and after today"
                                            handleChange={this.handleChange}/>
                        </Grid>


                        <Grid item md={4}>
                            <InputTextField value={passportValidity}
                                            formErrors={formErrors}
                                            name="passportValidity"
                                            label="Date Of Birth *"
                                            placeholder="YYYY.MM.DD"
                                            errorMsg="The expiry date should be in YYYY-MM-DD format and should not be before date of birth"
                                            handleChange={this.handleChange}/>
                        </Grid>

                        <Grid item md={12}>
                            <Button type="submit"
                                    onClick={this.showRegistrationInfoModal}
                                    disabled={this.disableSubmit()}
                                    variant="contained"
                                    color="primary">
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