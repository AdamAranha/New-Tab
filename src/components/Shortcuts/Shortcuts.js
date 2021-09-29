import React, { useState } from 'react';
import add from '../../assets/cross.svg';
import Modal from '../Modal/Modal';

export default function Shortcuts() {

    // const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        show: false,
        title: ''
    })

    function changeModalData(key, value) {
        setModalData(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    return (
        <section className='shortcuts'>
            <Modal close={() => changeModalData('show', false)} modalData={modalData} />
            <div className='shortcuts-existing' shortcut-letter='M'>
                <div className='shortcuts-edit' onClick={() => {
                    changeModalData('show', true);
                    changeModalData('title', 'Edit Shortcut');
                }} />
            </div>
            <div className='shortcuts-add' shortcut-add-img={add} onClick={() => {
                changeModalData('show', true);
                changeModalData('title', 'Add Shortcut');
            }} />
        </section>
    )
}