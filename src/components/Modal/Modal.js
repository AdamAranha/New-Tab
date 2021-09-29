import React from 'react';

export default function Modal({ close, modalData }) {


    return (
        modalData.show ?
            <div className='modal-wrapper'>
                <div className='overlay' />
                <div className='modal'>
                    <h1 className='title'>{modalData.title}</h1>
                    <p>Hey there, Neighbor</p>
                    <div className='button-group'>
                        <button className='cancel-button' onClick={() => close(false)}>Cancel</button>
                        <button className='confirm-button'>Confirm</button>
                    </div>
                </div>
            </div>
            : null
    )
}