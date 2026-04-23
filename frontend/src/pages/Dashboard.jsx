import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    contactInfo: ""
  });
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    await API.post("/items", form);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  const searchItem = async () => {
    const res = await API.get(`/items/search/${search}`);
    setItems(res.data);
  };

  return (
    <div className="container">
      <h2>📊 Your Dashboard</h2>

      <div className="card">
        <h3>Add Item</h3>
        <form onSubmit={addItem}>
          <input placeholder="Item Name" onChange={(e)=>setForm({...form,itemName:e.target.value})}/>
          <input placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})}/>
          <select onChange={(e)=>setForm({...form,type:e.target.value})}>
            <option>Lost</option>
            <option>Found</option>
          </select>
          <input placeholder="Location" onChange={(e)=>setForm({...form,location:e.target.value})}/>
          <input placeholder="Contact Info" onChange={(e)=>setForm({...form,contactInfo:e.target.value})}/>
          <button>Add Item</button>
        </form>
      </div>

      <div className="card">
        <h3>Search</h3>
        <input placeholder="Search item" onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={searchItem}>Search</button>
      </div>

      <div className="card">
        <h3>Items</h3>
        {items.map((item) => (
          <div key={item._id}>
            <strong>{item.itemName}</strong>
            <p>{item.description}</p>
            <p>{item.type} | {item.location}</p>
            <button onClick={()=>deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;