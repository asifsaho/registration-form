import validator from './validator';


describe('firstName validation function test', () => {
    it('Can\'t be empty', () => {
        expect(validator.firstName('')).toBeTruthy();
    });

    it('Should not be more than 8 character', () => {
        expect(validator.firstName('This is a long name')).toBeTruthy();
    });

    it('Should not contrain any special char or number', () => {
        expect(validator.firstName('This $%')).toBeTruthy();
        expect(validator.firstName('This 7')).toBeTruthy();
    });
});


describe('lastName validation function test', () => {
    it('Can\'t be empty', () => {
        expect(validator.lastName('')).toBeTruthy();
    });

    it('Should not be more than 8 character', () => {
        expect(validator.lastName('This is a long name')).toBeTruthy();
    });

    it('Should not contrain any special char or number', () => {
        expect(validator.lastName('This $%')).toBeTruthy();
        expect(validator.lastName('This 7')).toBeTruthy();
    });
});


describe('passportNumber test', () => {
    it('Passport ID should contain Alphabet and number and starts with alphabet', () => {
        expect(validator.passportNumber('BQ0622850')).toBeFalsy();
    });

    it('Passport ID should not contain any special character', () => {
        expect(validator.passportNumber('BQ062285$')).toBeTruthy();
    });

    it('Passport ID should not be more than 9 character long', () => {
        expect(validator.passportNumber('BQ06228509')).toBeTruthy();
    });
});


describe('dateOfBirth test', () => {
    it('Date Of Birth should be in YYYY-DD-MM format', () => {
        expect(validator.dateOfBirth('1992-09-08')).toBeFalsy();
    });

    it('Date Of Birth should not be older than 1900', () => {
        expect(validator.dateOfBirth('1899-01-01')).toBeTruthy();
    });

    it('Date Of Birth should not be in future', () => {
        expect(validator.dateOfBirth('2020-01-01')).toBeTruthy();
    });
});

describe('passportValidity test', () => {
    it('Date Of Birth should be in YYYY-DD-MM format', () => {
        expect(validator.passportValidity('1992.09.08', '1991.01.01')).toBeFalsy()
    });
});