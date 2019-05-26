import moment from "moment";

const nameValidationRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/;

export default {
    firstName: (value) => (!value.length || value.length > 8 || nameValidationRegex.test(value)),

    lastName: (value) => (!value.length || value.length > 8 || nameValidationRegex.test(value)),

    passportNumber: (value) => {
        const noSpecialCharRegex = RegExp('[^A-Za-z0-9]', 'g');
        const containNumberRegex = RegExp('[0-9]', 'g');
        const containAlphabetRegex = RegExp('[A-Za-z]', 'g');

        return (
            !value.length ||
            !containNumberRegex.test(value) ||
            !containAlphabetRegex.test(value) ||
            noSpecialCharRegex.test(value) || value.length !== 9
        );
    },

    dateOfBirth: (value) => {
        const DOBformatRegex = RegExp('^[0-9]{4}\\.[0-9]{1,2}\\.[0-9]{1,2}$', 'g');

        return (
            !value.length ||
            !DOBformatRegex.test(value) ||
            !moment(new Date(value)).isValid() ||
            !(moment(new Date(value)).diff('1919-01-01', 'days') > 0) ||
            (moment(new Date(value)).diff(new Date(), 'days') > 0)
        );
    },

    passportValidity: (value, dateOfBirth) => {
        const PVformatRegex = RegExp('^[0-9]{4}\\.[0-9]{1,2}\\.[0-9]{1,2}$', 'g');

        return (
            !value.length ||
            !PVformatRegex.test(value) ||
            !moment(new Date(value)).isValid() ||
            !(moment(new Date(value)).diff(moment(new Date(dateOfBirth)), 'days') > 0)
        );
    }
};