import React from 'react';

export default function PersonForm({ person: { firstName, lastName, age }, onTextChange, onAddClick, isUpdating, onCancelClick, onUpdateClick }) {
    return (
        <div className='row mt-4'>            
                <input type='text' className='col-md-3 ml-1 form-control' name='firstName'
                    value={firstName} onChange={onTextChange} placeholder='First Name' />
       
                <input type='text' className=' col-md-3 ml-1 form-control' name='lastName'
                    value={lastName} onChange={onTextChange} placeholder='Last Name' />
        
                <input type='text' className= 'col-md-3 ml-1 form-control' name='age'
                    value={age} onChange={onTextChange} placeholder='Age' />
            
            <div className='col-md-2 ml-1'>
                {!isUpdating ?
                    <button className='btn btn-primary btn-block' onClick={onAddClick}>Add</button> :
                    <div>
                        <button className='btn btn-warning btn-block' onClick={onUpdateClick}>Update</button>
                        <button className='btn btn-info btn-block' onClick={onCancelClick}>Cancel</button>
                    </div>
                }
            </div>
        </div>

    )
}