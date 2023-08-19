import { useState } from "react";
import { Button, Form, Input, Table, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";

const EditCategory = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});
  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "title",
      key: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return (
          <div className="flex justify-between">
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0">
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori başarıyla güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Modal
        title="Kategori İşlemleri"
        footer={false}
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}>
        <Form onFinish={onFinish}>
          <Table
            columns={columns}
            dataSource={categories}
            rowKey={"_id"}
            bordered
          />
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategory;
