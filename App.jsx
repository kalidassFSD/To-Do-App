import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import { useState,useEffect } from 'react';
import AddItem from "./components/AddItem";
import SearchItem from "./components/searchItem";
import ApiRequest from "./components/apiRequest";



function App() {

  const API_URL ="http://localhost:3500/items";

  const [items, setItems] = useState([]);
  
  const[newItem ,setNewItem] = useState('');

  const[search, setSearch]=useState('');

  const[fetchError ,setFetchError]=useState(null);

  const [isLoading ,setIsLoading]= useState(true);

   useEffect (  () => {
    
      const fetchItems= async() =>{
          try{
            console.log('rendering');
              
              const response =await fetch(API_URL);
              if(!response.ok)  throw Error("url not get the data")
              const ListItems = await response.json();
              console.log(ListItems);
              setItems(ListItems);
          }
          catch(err){
              setFetchError(err.message);
          }
          finally{
            setIsLoading(false);
          }
      }
      

      setTimeout(()=>{
        (async () => await fetchItems()) ();
      },2000)
   },[])

  


const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setANdSave(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${parseInt(id)}`;
    const result = await ApiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);

}

const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setANdSave(listItems);

   const delItem = items.filter((item)=>item.id===id)

   const DelOptions ={
        method:'DELETE',
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(delItem)

   }

   const reqUrl = `${API_URL}/${parseInt(id)}`;
    const result = await ApiRequest(reqUrl, DelOptions);
   if(result) setFetchError(result);

}

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!newItem) return;
  addItem(newItem);
  setNewItem('');
};

const setANdSave = (listItems)=>{
  setItems(listItems);

  
};




const addItem = async (item)=>{
  const id = parseInt(items.length ? items[(items.length)-1].id+1 : 1);
  
  const myNewItem = { id ,checked:false ,item};
  const listItems =[...items, myNewItem]
  setANdSave(listItems);

  const postOptions = {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(myNewItem)
  }

    const result =await  ApiRequest(API_URL,postOptions);

    if(result) setFetchError(result);

};


  return (
    <div className="App">
      <Header/>
      <SearchItem
              search={search}
              setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading...</p> }
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
      {!isLoading && <Content  
              items={items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))}  
              setItems={setItems} 
              handleCheck={handleCheck} 
              handleDelete={handleDelete}
      />}
      </main>
      <AddItem
              newItem={newItem} 
              setNewItem={setNewItem} 
              handleSubmit={handleSubmit}/>
      <Footer/>
    </div>
  );
}

export default App;
