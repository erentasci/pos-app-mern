import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import "./style.css";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ul className="flex gap-4 text-lg md:flex-col">
      {categories.map((category) => (
        <li key={category._id} className="category-item">
          <span>{category?.title}</span>
        </li>
      ))}

      <li
        className="!bg-purple-800 category-item hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="!bg-orange-800 category-item hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}>
        <EditOutlined className="md:text-2xl" />
      </li>
      <AddCategory
        setIsAddModalOpen={setIsAddModalOpen}
        isAddModalOpen={isAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <EditCategory
        setIsEditModalOpen={setIsEditModalOpen}
        isEditModalOpen={isEditModalOpen}
      />
    </ul>
  );
};

export default Categories;
