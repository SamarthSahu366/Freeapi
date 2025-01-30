import React from "react";
import "../css/Item.css"
import { ItemType } from "../pages/Home";
interface ItemProps {
  data: ItemType[];
  onDelete: (id: string) => void; 
}

const Item: React.FC<ItemProps> = ({ data ,onDelete}) => {
  if (!data.length) {
    return <p>No items available.</p>;
  }
  return (
    <div className="container">
  {data.map((item, index) => (
    <div className="item-card" key={index}>
      <ul>
        <li><strong>ID:</strong> {index + 1}</li>
        <li><strong>Name:</strong> {item.name || "No Name"}</li>
        <li><strong>Data:</strong> {JSON.stringify(item.data)}</li>
      </ul>
      <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  ))}
</div>

  );
};

export default Item;
