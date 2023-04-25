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
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createTable,
  deleteTable,
  detailTable,
  listTable,
  updateTable,
} from "../../redux/actions/table.action";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { listFloor } from "../../redux/actions/floor.action";

export default function Color() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(listTable({ page }));
    dispatch(listFloor({ page: 1 }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Mã bàn",
      dataIndex: "code",
    },
    {
      title: "Số người tối đa",
      dataIndex: "maxPeople",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <Popconfirm
              title="Bạn có muốn xoá bản ghi này?"
              onConfirm={() =>
                dispatch(
                  deleteTable(item.id, () => dispatch(listTable({ page })))
                )
              }
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{
                  cursor: "pointer",
                  paddingRight: 10,
                }}
              />
            </Popconfirm>
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

  function onChangeFloor(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  useEffect(() => {
    form.setFieldsValue({
      code: state.table.item.code,
      maxPeople: state.table.item.maxPeople,
      floorId: state.table.item.floorId,
    });
  }, [form, state.table]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailTable(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới bàn";
      case "UPDATE":
        return "Cập nhật bàn";
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
    console.log("🚀 ~ file: index.js:154 ~ onFinish ~ values:", values);
    switch (mode) {
      case "CREATE":
        dispatch(createTable(values, () => dispatch(listTable({ page }))));
        break;
      case "UPDATE":
        dispatch(updateTable(id, values, () => dispatch(listTable({ page }))));
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
      <h2>Danh sách bàn</h2>
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
            label="Mã bàn"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập tên bàn" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số người tối đa"
            name="maxPeople"
            rules={[
              { required: true, message: "Vui lòng nhập số người tối đa" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tầng"
            name="floorId"
            rules={[{ required: true, message: "Vui lòng chọn tầng" }]}
          >
            <Select
              showSearch
              placeholder="Chọn tầng"
              optionFilterProp="children"
              onChange={onChangeFloor}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {state.floor.items?.length
                ? state.floor.items.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))
                : []}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={state.table.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.table.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
