import { useState, useEffect } from "react";
import Item from "../components/Item";
import axios from "axios";
import AddItem from "../components/AddItem";
import { Navbar } from "react-bootstrap";

export interface ItemType {
  id: string;
  name?: string;
  data?: Record<string, unknown>;
}

const Home = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ItemType[]>("https://api.restful-api.dev/objects");
        setData(response.data);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOnAdditem=(newItem:ItemType)=>{
    setData((prev)=>[...prev,newItem]);
  }

  const handleDeleteItem = async (id: string) => {
    try {
        console.log("htis is soefneof",id)
        setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

  return (
    <>
      <div className="container">
      <Navbar/>
      <AddItem onAddItem={handleOnAdditem}/>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <Item data={data} onDelete={handleDeleteItem}/>
      )}
      </div>
    </>
  );
};

export default Home;
