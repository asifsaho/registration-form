import React from 'react';
import Select from 'react-select';
import countries from './countries';

export default (props) => (
    <Select
        value={props.value}
        onChange={(value) => props.handleChange({
            target: {
                name: props.name,
                value: value
            }
        })}
        options={countries}
    />
);