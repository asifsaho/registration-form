import React from 'react';


export default (props) => (
    <div>
        {console.log(props.data)}
        {props.data.map((item, i) => (
            <div key={i}>
                <h3>{item.label}</h3>
                <p>{item.value}</p>
            </div>
        ))}
    </div>
)