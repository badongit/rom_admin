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
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  deleteEmployee,
  detailEmployee,
  listEmployee,
  updateEmployee,
} from "../../redux/actions/employee.action";
import { listRole } from "../../redux/actions/role.action";
import { DeleteOutlined, EditOutlined, RedoOutlined } from "@ant-design/icons";
import { formatDate, formatMoney } from "../../common/common";

const { Option } = Select;

export default function Specification() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stateEmployee = useSelector((state) => state.employee);
  const stateRole = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(listEmployee({ page }));
    dispatch(listRole({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (record) => record.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (record) => EmployeeStatusText[record],
    },
    {
      title: "Lương",
      dataIndex: "salary",
      render: (record) => formatMoney(record),
    },
    {
      title: "Ngày vào",
      dataIndex: "dateJoin",
      render: (record) => formatDate(record),
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
                  deleteEmployee(item.id, () =>
                    dispatch(listEmployee({ page }))
                  )
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
                paddingRight: 10,
              }}
              onClick={() => showModalUpdate(item.id)}
            />
            <Popconfirm
              title="Bạn có muốn đặt lại mật khẩu cho tài khoản này khống?"
              onConfirm={() =>
                dispatch(
                  updateEmployee(item.id, { password: "hadilao123" }, () =>
                    dispatch(listEmployee({ page }))
                  )
                )
              }
              okText="Có"
              cancelText="Không"
            >
              <RedoOutlined
                style={{
                  cursor: "pointer",
                  paddingRight: 10,
                }}
              />
            </Popconfirm>
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
      name: stateEmployee.item.name,
      code: stateEmployee.item.code,
      phoneNumber: stateEmployee.item.phoneNumber,
      roleId: stateEmployee.item.roleId,
      salary: stateEmployee.item.salary,
    });
  }, [form, stateEmployee.item]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailEmployee(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới nhân viên";
      case "UPDATE":
        return "Cập nhật nhân viên";
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
          createEmployee(values, () => dispatch(listEmployee({ page })))
        );
        break;
      case "UPDATE":
        dispatch(
          updateEmployee(id, values, () => dispatch(listEmployee({ page })))
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
      <h2>Danh sách nhân viên</h2>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      <Modal
        title={showTitle(mode)}
        visible={visible}
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
            label="Mã nhân viên"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã nhân viên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên nhân viên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="roleId"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select
              showSearch
              placeholder="Chọn vai trò"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {stateRole.items?.length
                ? stateRole.items.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))
                : []}
            </Select>
          </Form.Item>
          <Form.Item
            label="Lương"
            name="salary"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lương",
                type: "number",
              },
            ]}
          >
            <InputNumber />
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
        dataSource={stateEmployee.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={stateEmployee.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}

const EmployeeStatusText = ["Hoạt động", "Tạm nghỉ", "Nghỉ việc"];
