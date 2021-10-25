import React, { useState } from 'react';
import add from '../../assets/cross.svg';
import Modal from '../Modal/Modal';

export default function Shortcuts() {

    const [localShortcutList, setLocalShortcutList] = useState(
        JSON.parse(window.localStorage.getItem('newPageData')) !== null ?
            JSON.parse(window.localStorage.getItem('newPageData')).shortcutList !== undefined ?
                JSON.parse(window.localStorage.getItem('newPageData')).shortcutList : [] : []
    )
    const [modalData, setModalData] = useState({
        show: false,
        title: '',
        name: '',
        URL: '',
        id: ''
    })

    function changeModalData(changeLog) {
        changeLog.forEach(({ key, value }) => {
            setModalData(prevState => {
                return {
                    ...prevState,
                    [key]: value
                }
            })
        })
    }

    function trimShortcutName(name) {
        if (name.length > 12) {
            return name.slice(0, 10) + '...'
        } else return name;
    }

    return (
        <section className='shortcuts'>
            <Modal close={() => changeModalData([{ key: 'show', value: false }])} modalData={modalData} changeModalData={changeModalData} localShortcutList={localShortcutList} setLocalShortcutList={setLocalShortcutList} />

            {localShortcutList.map(({ name, URL, id }) => {
                return (
                    <a className='shortcuts-existing' href={URL} shortcut-name={trimShortcutName(name)} shortcut-letter={name[0].toUpperCase()} onClick={() => {

                    }}>
                        <div className='shortcuts-edit' onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            changeModalData([
                                { key: 'show', value: true },
                                { key: 'title', value: 'Edit Shortcut' },
                                { key: 'name', value: name },
                                { key: 'URL', value: URL },
                                { key: 'id', value: id }
                            ]);
                        }} />
                    </a>
                )
            })}

            <div className='shortcuts-add' shortcut-add-img={add} onClick={() => {
                changeModalData([
                    { key: 'show', value: true },
                    { key: 'title', value: 'Add Shortcut' },
                    { key: 'name', value: '' },
                    { key: 'URL', value: '' },
                    { key: 'id', value: '' }]);
            }} />
            {/* <button className='testButton' onClick={() => console.log(modalData)}>Click Here for Modal Data</button> */}
        </section>
    )
}