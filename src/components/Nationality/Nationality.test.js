import React from 'react';
import {mount} from 'enzyme';
import Nationality from './Nationality';

describe('Test Nationality Component', () => {
    it('Nationality Component', () => {
        const handleChange = () => {};
        const wrapper = mount(<Nationality value={{label: 'Bangladesh', value: "Bangladesh"}}
                                           name="nationality"
                                           handleChange={handleChange}/>);

        expect(wrapper.find('.css-dvua67-singleValue').text()).toBe('Bangladesh');

        wrapper.unmount();
    });
});