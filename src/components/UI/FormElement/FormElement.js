import React from 'react';

const FormElement = (props) => {
        switch (props.type) {
            case 'input':
                return (
                    <input 
                        onChange = {props.change}
                        {...props.config}
                        value = {props.value}/>
                );
            
            case 'select':
                const options = props.config.options.map(opt => {
                    return (
                        <option 
                            key = {opt.value}
                            value = {opt.value}>
                            {opt.text}
                        </option>
                    )
                })
                return (
                    <select 
                        onChange = {props.change}
                        value = {props.value}>
                        {options}
                    </select>
                )

            default:
                return null;
        }
};

export default FormElement;