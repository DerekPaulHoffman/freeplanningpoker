import React from 'react';

import Input from '../Input/Input';

import './UserInfoModal.scss';

const UserInfoModal = () => {
    return (
        <div className="user-info-modal">
            <Input 
                inputType="text" 
                placeholder="Enter UserName"
                name="userName"
            />
        </div>
    )
}

export default UserInfoModal;