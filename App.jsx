import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import { useState } from 'react';
import AddItem from "./components/AddItem";
import SearchItem from "./components/searchItem";



function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('taskList')));
  
  const[newItem ,setNewItem] = useState('');

  const[search, setSearch]=useState('');

const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setANdSave(listItems);
}

const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setANdSave(listItems);
}

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!newItem) return;
  addItem(newItem);
  setNewItem('');
};

const setANdSave = (listItems)=>{
  setItems(listItems);

  localStorage.setItem('taskList', JSON.stringify(listItems));
};

const  taskList = localStorage.getItem('shoppinglist');


const addItem =(item)=>{
  const id = items.length ? items[items.length-1].id + 1 : 1;
  const myNewItem = { id ,checked:false ,item};
  const listItems =[...items, myNewItem]
  setANdSave(listItems);
};


  return (
    <div className="App">
      <Header/>
      <SearchItem
              search={search}
              setSearch={setSearch}
      />
      
      <Content  
              items={items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))}  
              setItems={setItems} 
              handleCheck={handleCheck} 
              handleDelete={handleDelete}
      />
      <AddItem
              newItem={newItem} 
              setNewItem={setNewItem} 
              handleSubmit={handleSubmit}/>
      <Footer/>
    </div>
  );
}

export default App;