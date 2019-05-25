import React, {Component} from 'react';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

class DatePicker extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: moment(),
            focused: false
        }
    }

    onDateChange = (date) => {
        this.setState({date});
        this.props.handleDatePickerChange(this.props.name, date)
    };

    render() {
        return (
            <SingleDatePicker
                date={this.state.date}
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                onFocusChange={({focused}) => this.setState({focused})}
            />
        )
    }
}

export default DatePicker;