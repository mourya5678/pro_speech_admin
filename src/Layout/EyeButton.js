import React from 'react'

const EyeButton = ({ data, onClick }) => {
    return <i onClick={onClick} className={`fa-solid ${data} position-absolute end-0 top-50 translate-middle-y me-3`}></i>
}

export default EyeButton