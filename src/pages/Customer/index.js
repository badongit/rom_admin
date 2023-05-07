import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Pagination,
  Popconfirm,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  deleteCustomer,
  detailCustomer,
  listCustomer,
  updateCustomer,
} from "../../redux/actions/customer.action";
import {
  DeleteOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { formatTime } from "../../common/common";

export default function Customer() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(listCustomer({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "point",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <EditOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => showModalUpdate(item.id)}
            />
          </>
        );
      },
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: state.item.name,
      phoneNumber: state.item.phoneNumber,
      point: state.item.point,
    });
  }, [form, state.item]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailCustomer(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới coupon";
      case "UPDATE":
        return "Cập nhật coupon";
      default:
        break;
    }
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới";
      case "UPDATE":
        return "Cập nhật";
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createCustomer(values, () => dispatch(listCustomer({ page })))
        );
        break;
      case "UPDATE":
        dispatch(
          updateCustomer(id, values, () => dispatch(listCustomer({ page })))
        );
        break;
      default:
        break;
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <h2>Danh sách khách hàng</h2>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      <Modal
        title={showTitle(mode)}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Số điện thoại không hợp lệ",
                length: 10,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={state.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
