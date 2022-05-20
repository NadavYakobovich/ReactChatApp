import React from 'react';

const ValidFormAlert = ({validInfo, info}) => {
    if (validInfo === "is-invalid" || validInfo === null || validInfo === false) {
        return (
            <p className="text-danger fw-normal ">
                <i className="bi bi-info-circle"></i> {info}
            </p>
        );
    }

};

export default ValidFormAlert;