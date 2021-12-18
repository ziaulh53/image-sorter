import { Button, Input, Modal, PageHeader, Table } from "antd";
import React, { useState } from "react";

const Clients = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({});

  const closeModal = () => {
    setState({});
    setVisible(false);
  };

  return (
    <div>
      <div className="mb-3">
        <PageHeader
          className="site-page-header"
          // onBack={() => null}
          title="Clients"
        />
      </div>
      <div className="text-end mb-2">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add Client
        </Button>
      </div>
      <div className="">
        <Table columns={[]} dataSource={[]} />
      </div>

      <Modal
        title="Add Client"
        visible={visible}
        onCancel={closeModal}
        closable
      >
        <Input />
      </Modal>
    </div>
  );
};

export default Clients;
