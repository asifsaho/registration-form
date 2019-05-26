import React from 'react';
import {mount} from 'enzyme';
import InputTextField from './InputTextField';

describe('Test InputTextField Component', () => {
    it('Value, placeholder, label and errormsg should be rendered', () => {
        const handleChange = () => {};
        const wrapper = mount(<InputTextField value="John"
                                              formErrors={{firstName: true}}
                                              name="firstName"
                                              label="Passport Number *"
                                              placeholder="John"
                                              errorMsg="Error Message"
                                              handleChange={handleChange}/>);

        expect(wrapper.find('input').html().includes('value="John"')).toBe(true);
        expect(wrapper.find('input').html().includes('placeholder="John"')).toBe(true);
        expect(wrapper.find('label').text()).toBe("Passport Number *");
        expect(wrapper.find('.Mui-error').text()).toBe("Error Message");

        wrapper.unmount();
    });
});