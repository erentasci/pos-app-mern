import { Form, Table } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";

const EditCategory = ({ isEditModalOpen, setIsEditModalOpen }) => {
  return (
    <div>
      <Modal
        title="Kategori İşlemleri"
        footer={false}
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}>
        <Form>
          <Table />
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategory;
