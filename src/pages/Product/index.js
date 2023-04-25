import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Upload,
  Pagination,
  Popconfirm,
  Row,
  Col,
  Select,
  InputNumber,
  Tabs,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listFloor } from "../../redux/actions/floor.action";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  formatMoney,
  formatTime,
  formatTitle,
  getBase64,
} from "../../common/common";
import { listCategory } from "../../redux/actions/category.action";
import {
  createProduct,
  deleteProduct,
  detailProduct,
  listProduct,
  updateProduct,
} from "../../redux/actions/product.action";
import { listTable } from "../../redux/actions/table.action";
import { listStorage } from "../../redux/actions/storage.action";
import { listSpecification } from "../../redux/actions/specification.action";
import { BASE_URL } from "../../constants/config";
import BraftEditor from "braft-editor";
import parse from "html-react-parser";

const { Option } = Select;

export default function Product() {
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
      dispatch(listProduct({ page, keyword }));
    } else {
      dispatch(listProduct({ page }));
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
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (record) => record.name,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "shortDescription",
      render: (record) => {
        const a = formatTitle(record);
        console.log("======", a);
        return a;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",

      render: (record) => formatTime(record),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (record) => formatTime(record),
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
                  deleteProduct(item.id, () => dispatch(listProduct({ page })))
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
      name: state.product.item.name,
      description: BraftEditor.createEditorState(
        state.product.item.description
      ),
      shortDescription: state.product.item.shortDescription,
      categoryId: state.product.item?.category?.id,
      branchId: state.product.item?.branch?.id,
      productVersions: state.product.item?.productVersions?.map((e) => ({
        storageId: e.storage.id,
        colorId: e.color.id,
        price: e.price,
        salePrice: e.salePrice,
        quantity: e.quantity,
      })),
      specificationDetails: state.product.item?.specifications?.map((e) => ({
        specificationId: e.specificationId,
        content: e.content,
      })),
    });

    setFileList(
      state.product.item?.productImages?.map((e) => ({
        uid: e.id,
        name: e.url,
        status: "done",
        url: `${BASE_URL}/${e.url}`,
        thumbUrl: `${BASE_URL}/${e.url}`,
      }))
    );
  }, [form, state.product.item]);

  const showModal = () => {
    dispatch(listCategory({ page: 1, isGetAll: 1 }));
    dispatch(listFloor({ page: 1, isGetAll: 1 }));
    dispatch(listTable({ page: 1, isGetAll: 1 }));
    dispatch(listStorage({ page: 1, isGetAll: 1 }));
    dispatch(listSpecification({ page: 1, isGetAll: 1 }));
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
    setFileList([]);
  };

  const showModalUpdate = (id) => {
    dispatch(listCategory({ page: 1, isGetAll: 1 }));
    dispatch(listFloor({ page: 1, isGetAll: 1 }));
    dispatch(listTable({ page: 1, isGetAll: 1 }));
    dispatch(listStorage({ page: 1, isGetAll: 1 }));
    dispatch(listSpecification({ page: 1, isGetAll: 1 }));
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailProduct(id));
  };

  const showModalDetail = (id) => {
    setId(id);
    setMode("DETAIL");
    setVisibleDetail(true);
    dispatch(detailProduct(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới sản phẩm";
      case "UPDATE":
        return "Cập nhật sản phẩm";
      case "DETAIL":
        return "Chi tiết sản phẩm";
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
          createProduct(
            { ...values, description: values.description.toHTML() },
            () => {
              setVisible(false);
              setFileList([]);
              form.resetFields();
              dispatch(listProduct({ page }));
            }
          )
        );
        break;
      case "UPDATE":
        if (!values.images?.length) {
          values.images = { fileList };
        }
        dispatch(
          updateProduct(
            id,
            { ...values, description: values.description.toHTML() },
            () => {
              setVisible(false);
              setFileList([]);
              form.resetFields();
              dispatch(listProduct({ page }));
            }
          )
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

  function onChangeCategory(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

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
    dispatch(listProduct({ page: 1, keyword: val }));
    setKeyword(val);
  };

  return (
    <MainLayout>
      <h2>Danh sách sản phẩm</h2>
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
                  onChange={onChangeCategory}
                  onSearch={onSearch}
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
                label="Hãng"
                name="branchId"
                rules={[{ required: true, message: "Vui lòng chọn hãng" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn hãng"
                  optionFilterProp="children"
                  onChange={onChangeCategory}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {state.branch.items?.length
                    ? state.branch.items.map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))
                    : []}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input />
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
                  {fileList?.length >= 8 ? null : (
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
            <Col span={24}>
              <Form.Item
                label="Mô tả đầy đủ"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <BraftEditor
                  language={"vi-vn"}
                  className="my-editor"
                  controls={controls}
                  placeholder="Nhập mô tả"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Phiên bản"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Form.List name="productVersions">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            label="Bộ nhớ"
                            name={[name, "storageId"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn bộ nhớ",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn bộ nhớ"
                              optionFilterProp="children"
                              onChange={onChangeCategory}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {state.storage.items?.length
                                ? state.storage.items.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))
                                : []}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Màu sắc"
                            name={[name, "colorId"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn màu sắc",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn màu sắc"
                              optionFilterProp="children"
                              onChange={onChangeCategory}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {state.color.items?.length
                                ? state.color.items.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))
                                : []}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Giá gốc"
                            name={[name, "price"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập giá gốc",
                                type: "number",
                                min: 1,
                              },
                            ]}
                          >
                            <InputNumber placeholder="Giá gốc" />
                          </Form.Item>
                          <Form.Item
                            label="Giá bán thực tế"
                            name={[name, "salePrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập giá thực tế",
                                type: "number",
                                min: 1,
                              },
                            ]}
                          >
                            <InputNumber wr placeholder="Giá thực tế" />
                          </Form.Item>
                          <Form.Item
                            label="Số lượng trong kho"
                            name={[name, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số lượng",
                                type: "number",
                                min: 1,
                              },
                            ]}
                          >
                            <InputNumber placeholder="Số lượng" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm phiên bản
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thông số kỹ thuật"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Form.List name="specificationDetails">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            name={[name, "specificationId"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn thông số",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn thông số"
                              optionFilterProp="children"
                              onChange={onChangeCategory}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {state.specification.items?.length
                                ? state.specification.items.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))
                                : []}
                            </Select>
                          </Form.Item>
                          <Form.Item name={[name, "content"]}>
                            <Input placeholder="Giá trị" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm thông số
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
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
                {state.product.item?.category?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hãng" name="branchId">
                {state.product.item?.branch?.name}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Tên sản phẩm" name="name">
                {state.product.item?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mô tả ngắn" name="shortDescription">
                {state.product.item?.shortDescription}
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
            <Col span={24}>
              <Form.Item
                label="Mô tả đầy đủ"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                {parse(state.product.item?.description || "")}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Phiên bản"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Tabs defaultActiveKey="0">
                  {state.product.item?.productVersions?.map((e, i) => (
                    <Tabs.TabPane
                      tab={`${e.storage.name} - ${e.color.name}`}
                      key={i.toString()}
                    >
                      {`Giá gốc: ${formatMoney(
                        e?.price
                      )} - Giá sale: ${formatMoney(e.salePrice)} - SL còn: ${
                        e.quantity
                      } chiếc`}
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thông số kỹ thuật"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Row gutter={[16, 16]}>
                  <Col span={6}>Thông số</Col>
                  <Col span={6}>Giá trị</Col>
                </Row>
                {state.product.item?.specifications?.map((e) => (
                  <Row gutter={[16, 16]}>
                    <Col span={6}>{e.name}</Col>
                    <Col span={6}>{e.content}</Col>
                  </Row>
                ))}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={state.product.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.product.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
