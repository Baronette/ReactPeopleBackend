import React from 'react';

export default function PersonRow({ person: { firstName, lastName, age }, onEditClick, onDeleteClick, onCheckChange, isChecked}) {
    return (
    <tr >
        <td><input type='checkbox'checked={isChecked} className='form-control form-control-sm' onChange = {onCheckChange}></input></td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <button className='btn btn-info' onClick={onEditClick}>Edit</button>
            <button className='btn btn-danger ml-2' onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>);
}