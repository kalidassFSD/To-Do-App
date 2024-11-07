import { FaTrashAlt } from 'react-icons/fa';


const LineItem =({item,handleCheck,handleDelete})=>{
    return(
        <li className="item" >
        <input
            type="checkbox"
            onChange={() => handleCheck(item.id)}
            checked={item.checked}
        />
        <label
            style={(item.checked) ? { textDecoration: 'line-through' } : null}
            onDoubleClick={() => handleCheck(item.id)}
        >{item.item}</label>
        <button 
            className="btn"
            onClick={() => handleDelete(item.id)}
            tabIndex="0"
        ><FaTrashAlt/></button>    
    </li>
    );
};

export default LineItem;