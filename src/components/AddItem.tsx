import axios from "axios";
import { useState } from "react";
import "../css/AddNewItem.css"

interface ItemType {
    id: string;
    name?: string;
    data?: Record<string, unknown>;
}

interface AddItemProps {
    onAddItem: (newItem: ItemType) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItem }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const addNewItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) {
            alert("Please enter a name and description.");
            return;
        }

        try {
            const response = await axios.post<ItemType>(
                "https://api.restful-api.dev/objects",
                {
                    name: name,
                    data: { description: description },
                }
            );
            onAddItem(response.data);
            setName("");
            setDescription("");
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className="add-item-form">
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
            />
            <button onClick={addNewItem} className="add-button">Add Item</button>
        </div>

    );
}

export default AddItem
