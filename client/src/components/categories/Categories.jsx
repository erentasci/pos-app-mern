import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";

const Categories = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log(values);
    try {
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      form.resetFields();
      message.success("Yeni kategori başarıyla eklendi!");
      setCategories([...categories, values]);
    } catch {
      message.error("Kategori eklenirken bir hata oluştu!");
    }
  };

  return (
    <ul className="flex gap-4 text-lg md:flex-col">
      {categories.map((category) => (
        <li key={category._id} className="category-item">
          <span>{category?.title}</span>
        </li>
      ))}

      <li
        className="!bg-purple-800 category-item hover:opacity-90"
        onClick={() => setIsModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <Modal
        title="Yeni Kategori Ekle"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              {
                required: true,
                message: "Kategori adı boş bırakılamaz!",
              },
            ]}>
            <Input placeholder="Kategori Adı" />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
};

export default Categories;
