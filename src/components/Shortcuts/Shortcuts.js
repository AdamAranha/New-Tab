import React from 'react';
import add from '../../assets/cross.svg';

export default function Shortcuts() {
    return (
        <section className='shortcuts'>
            <div className='shortcuts-existing' shortcut-letter='M'>
                <div className='shortcuts-edit' />
            </div>
            <div className='shortcuts-add' shortcut-add-img={add} />
        </section>
    )
}