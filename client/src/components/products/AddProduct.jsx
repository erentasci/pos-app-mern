import { Button, Form, Input, Modal, Select, message } from "antd";
import React from "react";

const AddProduct = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      form.resetFields();
      message.success("Yeni Ürün başarıyla eklendi!");
      setProducts([...products, values]);
      setIsAddModalOpen(false);
    } catch {
      message.error("Ürün eklenirken bir hata oluştu!");
    }
  };
  return (
    <div>
      <Modal
        title="Yeni Ürün Ekle"
        open={isAddModalOpen}
        footer={false}
        onCancel={() => setIsAddModalOpen(false)}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Form.Item
            name="title"
            label="Ürün Adı Ekle"
            rules={[
              {
                required: true,
                message: "Ürün adı boş bırakılamaz!",
              },
            ]}>
            <Input placeholder="Ürün adı giriniz.." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli Ekle"
            rules={[
              {
                required: true,
                message: "Ürün görseli boş bırakılamaz!",
              },
            ]}>
            <Input placeholder="Ürün görseli giriniz.." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı Ekle"
            rules={[
              {
                required: true,
                message: "Ürün fiyatı boş bırakılamaz!",
              },
            ]}>
            <Input placeholder="Ürün fiyatı giriniz.." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Ürün kategorisi boş bırakılamaz!" },
            ]}>
            <Select
              showSearch
              placeholder="Kategori seçiniz"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={
                categories?.map((category) => ({
                  value: category.title,
                  title: category.title,
                })) ?? []
              }
            />
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

export default AddProduct;
