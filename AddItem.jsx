import {FaPlus} from 'react-icons/fa';
import { useRef } from 'react';

const AddItem=({newItem ,setNewItem,handleSubmit})=>{
    const inputRef = useRef()
    return(
        <form className='addForm'onSubmit={handleSubmit}>
            <label htmlFor='addItem'>Add Task</label>
            <input
                autoFocus
                placeholder="Add Item"
                type='text '
                ref={inputRef}
                onSubmit={handleSubmit}
                value={newItem}
                onChange={(e)=>setNewItem(e.target.value)}

            />
            <button 
                className='addbtn'    
                 type='submit' aria-label='Add Task' onClick={()=>inputRef.current.focus()}><FaPlus/></button>
        </form>
    );
}

export default AddItem;