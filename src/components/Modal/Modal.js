import React, { useState } from 'react';

export default function Modal({ close, modalData, changeModalData, localShortcutList, setLocalShortcutList }) {

    const [errorName, setErrorName] = useState('');
    const [errorURL, setErrorURL] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        changeModalData([{ key: name, value }])
    }

    function resetErrorText() {
        setErrorName('');
        setErrorURL('');
    }

    function handleClick() {
        let localList = localShortcutList;
        resetErrorText();
        if (modalData.name === '') setErrorName('*Please enter a name for your shortcut');
        if (modalData.URL === '') setErrorURL('*Please enter a URL for your shortcut');
        if (modalData.name !== '' && modalData.URL !== '') {
            const index = localList.indexOf(localList.find(shortcut => shortcut.id === modalData.id));
            if (index !== -1 && localList.length !== 0) {
                localList.splice(index, 1, {
                    name: modalData.name,
                    URL: modalData.URL,
                    id: modalData.id
                })
            } else {
                localList.push({
                    name: modalData.name,
                    URL: modalData.URL,
                    id: `${Date.now()}`
                })
            }
            let localNewPageData = JSON.parse(window.localStorage.getItem('newPageData'));
            localNewPageData.shortcutList = localList;
            window.localStorage.setItem('newPageData', JSON.stringify(localNewPageData));
            setLocalShortcutList([...localList]);
            close();
        }
    }

    function removeShortcut() {
        let localList = localShortcutList;
        let localNewPageData = JSON.parse(window.localStorage.getItem('newPageData'));

        const index = localList.indexOf(localList.find(({ id }) => id === modalData.id));
        localList.splice(index, 1);
        localNewPageData.shortcutList = localList;
        window.localStorage.setItem('newPageData', JSON.stringify(localNewPageData));
        setLocalShortcutList([...localList]);
        close();
    }

    return (
        modalData.show ?
            <div className='modal-wrapper'>
                <div className='overlay' />
                <div className='modal'>
                    <h1 className='title'>{modalData.title}</h1>
                    <p className='error-text'>
                        {errorName}
                        <br />
                        {errorURL}
                    </p>
                    <form className='form'>
                        <div className='form-name'>
                            <label className='label-name'>Name</label>
                            <input className='name' name='name' value={modalData.name} onChange={handleChange}></input>
                        </div>
                        <div className='form-URL'>
                            <label className='label-URL'>URL</label>
                            <input className='URL' name='URL' value={modalData.URL} onChange={handleChange}></input>
                        </div>
                    </form>
                    <div className='button-group'>
                        <button className='remove-button' onClick={removeShortcut}>Remove</button>
                        <div className='cancel-confirm'>
                            <button className='cancel-button' onClick={() => { close(); resetErrorText(); }}>Cancel</button>
                            <button className='confirm-button' onClick={handleClick}>Confirm</button>
                        </div>

                    </div>
                </div>
            </div >
            : null
    )
}