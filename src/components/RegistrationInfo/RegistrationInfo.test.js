import React from 'react';
import {mount} from 'enzyme';
import RegistrationInfo from './RegistrationInfo';

describe('Test PassportIssueCountry Component', () => {
    it('RegistrationInfo Component should display first name and last name', () => {
        const hideRegistrationInfoModal = jest.fn();

        const wrapper = mount(<RegistrationInfo
            hideRegistrationInfoModal={hideRegistrationInfoModal}
            showRegistrationInfo={true}
            data={[
                {label: 'First Name', value: 'John'},
                {label: 'Last Name', value: 'Doe'},
            ]}/>);

        expect(wrapper.find('strong').at(0).text()).toBe('First Name');
        expect(wrapper.find('strong').at(1).text()).toBe('Last Name');

        expect(wrapper.find('p').find('span').at(0).text()).toBe('John');
        expect(wrapper.find('p').find('span').at(1).text()).toBe('Doe');

        wrapper.unmount();
    });


    it('hideRegistrationInfoModal should be called after clicking on close button', () => {
        const hideRegistrationInfoModal = jest.fn();

        const wrapper = mount(<RegistrationInfo
            hideRegistrationInfoModal={hideRegistrationInfoModal}
            showRegistrationInfo={true}
            data={[
                {label: 'First Name', value: 'John'},
                {label: 'Last Name', value: 'Doe'},
            ]}/>);

        wrapper.find('button').hostNodes().at(0).simulate('click');
        expect(hideRegistrationInfoModal).toHaveBeenCalled();

        wrapper.find('button').hostNodes().at(1).simulate('click');
        expect(hideRegistrationInfoModal).toHaveBeenCalled();

        wrapper.unmount();
    });
});