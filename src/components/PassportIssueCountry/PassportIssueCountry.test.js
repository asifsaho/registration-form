import React from 'react';
import {mount} from 'enzyme';
import PassportIssueCountry from './PassportIssueCountry';

describe('Test PassportIssueCountry Component', () => {
    it('PassportIssueCountry Component', () => {
        const handleChange = () => {};

        const wrapper = mount(<PassportIssueCountry value={{label: 'Bangladeshi', value: "Bangladeshi"}}
                                                    name="nationality"
                                                    handleChange={handleChange}/>);

        expect(wrapper.find('.css-dvua67-singleValue').text()).toBe('Bangladeshi');

        wrapper.unmount();
    });
});