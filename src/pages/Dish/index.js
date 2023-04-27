import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Upload,
} from "antd";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney, getBase64 } from "../../common/common";
import { BASE_URL } from "../../constants/config";
import MainLayout from "../../containers/MainLayout";
import { listCategory } from "../../redux/actions/category.action";
import {
  createDish,
  deleteDish,
  detailDish,
  listDish,
  updateDish,
} from "../../redux/actions/dish.action";
import "./dish.css";

const { Option } = Select;

export default function Dish() {
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (keyword) {
      dispatch(listDish({ page, keyword }));
    } else {
      dispatch(listDish({ page }));
    }
  }, [dispatch, page]);

  const controls = [
    "bold",
    "italic",
    "underline",
    "text-color",
    "separator",
    "link",
    "separator",
    "media",
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên món ăn",
      dataIndex: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (record) => record.name,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (record) => formatMoney(record),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <EyeOutlined
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
              onClick={() => showModalDetail(item.id)}
            />
            <Popconfirm
              title="Bạn có muốn xoá bản ghi này?"
              onConfirm={() =>
                dispatch(
                  deleteDish(item.id, () => dispatch(listDish({ page })))
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

  useEffect(() => {
    form.setFieldsValue({
      name: state.dish.item.name,
      categoryId: state.dish.item?.categoryId,
      price: state.dish.item.price,
    });

    if (state.dish.item.id) {
      setFileList([
        {
          name: state.dish.item.image,
          id: state.dish.item.id,
          url: BASE_URL + "/" + state.dish.item.image,
        },
      ]);
    }
  }, [form, state.dish.item]);

  const showModal = () => {
    dispatch(listCategory({ page: 1, isGetAll: 1 }));
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
    setFileList([]);
  };

  const showModalUpdate = (id) => {
    dispatch(listCategory({ page: 1, isGetAll: 1 }));
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailDish(id));
  };

  const showModalDetail = (id) => {
    setId(id);
    setMode("DETAIL");
    setVisibleDetail(true);
    dispatch(detailDish(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới món ăn";
      case "UPDATE":
        return "Cập nhật món ăn";
      case "DETAIL":
        return "Chi tiết món ăn";
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
    setVisibleDetail(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createDish({ ...values }, () => {
            setVisible(false);
            setFileList([]);
            form.resetFields();
            dispatch(listDish({ page }));
          })
        );
        break;
      case "UPDATE":
        if (!values.images?.length) {
          values.images = { fileList };
        }
        dispatch(
          updateDish(id, { ...values }, () => {
            setVisible(false);
            setFileList([]);
            form.resetFields();
            dispatch(listDish({ page }));
          })
        );
        break;
      default:
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const onSearchKeyword = (val) => {
    dispatch(listDish({ page: 1, keyword: val }));
    setKeyword(val);
  };

  return (
    <MainLayout>
      <h2>Danh sách món ăn</h2>
      <Row gutter={[16, 16]}>
        <Col offset={8} span={8}>
          <Input.Search
            placeholder="Nhập từ khoá"
            onSearch={onSearchKeyword}
            enterButton
          />
        </Col>
      </Row>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      {/* modal create/update */}
      <Modal
        title={showTitle(mode)}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
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
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn danh mục"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {state.category.items?.length
                    ? state.category.items.map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))
                    : []}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tên món ăn"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên món ăn" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đơn giá" name="price">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mô tả ngắn" name="shortDescription">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Ảnh đại diện"
                name="images"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Upload
                  action={`${BASE_URL}/api`}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  preview
                >
                  {fileList?.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* modal detail */}
      <Modal
        title={showTitle(mode)}
        visible={visibleDetail}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
      >
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Danh mục" name="categoryId">
                {state.dish.item?.category?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên món ăn" name="name">
                {state.dish.item?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đơn giá" name="price">
                {state.dish.item?.shortDescription}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mô tả ngắn" name="description">
                {state.dish.item?.shortDescription}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Ảnh đại diện"
                name="images"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  preview
                ></Upload>
              </Form.Item>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={state.dish.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.dish.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
