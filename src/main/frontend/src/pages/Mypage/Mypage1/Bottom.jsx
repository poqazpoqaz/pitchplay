// Bottom.js
import React from 'react';

const Bottom = ({ formFields, isEditable, handleInputChange, toggleEdit }) => {
    return (
        <div className="bottom">
            <h1>마이페이지 &gt; 내정보</h1>
            <ul>
                {formFields.map((field) => (
                    <li key={field.name} className={field.name === "intro" ? "textarea" : ""}>
                        <label>{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            value={field.value}
                            onChange={handleInputChange}
                            disabled={!isEditable}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={toggleEdit}>
                {isEditable ? '수정 완료' : '프로필 수정'}
            </button>
        </div>
    );
};

export default Bottom;
