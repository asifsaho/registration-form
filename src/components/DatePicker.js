import React from "react";
import DatePicker from "react-datepicker";
import {withStyles} from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";

class DatePickerWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }

    handleChange = (date) => {
        this.setState({
            date: date
        });

        this.props.handleChange({
            target: {
                value: date,
                name: this.props.name
            }
        })
    };

    render() {
        return (
            <DatePicker
                dateFormat="d/MM/YYYY"
                className={this.props.classes.datePicker}
                selected={this.state.date}
                onChange={this.handleChange}
            />
        );
    }
}

const styles = {
    datePicker: {
        border: 0,
        borderBottom: '1px solid gray',
        padding: '8px 0',
        fontSize: '14px',
        width: '100%'
    }
};

export default withStyles(styles)(DatePickerWrap);