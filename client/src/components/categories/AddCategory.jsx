import { Button, Form, Input, Modal, message } from "antd";
import React from "react";

const AddCategory = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {

    try {
      fetch(process.env.REACT_APP_SERVER_URL + "api/categories/add-category", {
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
    <div>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        footer={false}
        onCancel={() => setIsAddModalOpen(false)}>
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
    </div>
  );
};

export default AddCategory;
