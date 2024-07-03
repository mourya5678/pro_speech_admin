import React from 'react'

const PaginationDropdown = ({ onChange }) => {
    return (
        <div className='d-flex align-items-center gap-2'>
            <p className='mb-0'>Show</p>
            <select className='ct_pagination_select_21' onChange={(e) => onChange(e.target.value)}>
                <option value={10} >10</option>
                <option value={20} >20</option>
                <option value={30} >30</option>
            </select>
            <p className='mb-0'>entries</p>
        </div>
    )
}

export default PaginationDropdown