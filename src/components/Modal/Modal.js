import React, { useState } from 'react';

export default function Modal({ close, modalData }) {

    const [values, setValues] = useState({
        name: '',
        URL: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        modalData.show ?
            <div className='modal-wrapper'>
                <div className='overlay' />
                <div className='modal'>
                    <h1 className='title'>{modalData.title}</h1>
                    <p>Hey there, Neighbor</p>
                    <form className='form'>
                        <div className='form-name'>
                            <label>Name</label>
                            <input name='name' value={values.name} onChange={handleChange}></input>
                        </div>
                        <div className='form-URL'>
                            <label>URL</label>
                            <input name='URL' value={values.URL} onChange={handleChange}></input>
                        </div>
                    </form>
                    <div className='button-group'>
                        <button className='cancel-button' onClick={() => close(false)}>Cancel</button>
                        <button className='confirm-button'>Confirm</button>
                    </div>
                </div>
            </div>
            : null
    )
}