import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Modal,
  Table,
  Form,
  Pagination,
  Popconfirm,
  Row,
  Col,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckSquareOutlined,
  EyeOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { formatTime, formatMoney } from "../../common/common";
import {
  changeStatusOrder,
  detailOrder,
  listOrder,
} from "../../redux/actions/order.action";
import { OrderStatus, OrderStatusEnum } from "./order-status.const";
import { useReactToPrint } from "react-to-print";

const OrderTypeText = ["Tại quán", "Mang đi"];
const PaymentMethodText = ["Tiền mặt", "Chuyển khoản"];
const OrderStatusText = ["Chờ xác nhận", "Đang thực hiện", "Hoàn thành", "Hủy"];

export default function Order() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(listOrder({ page, isGetDetails: 1, status: [2, 3].join(",") }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "type",
      render: (record) => OrderTypeText[record],
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      render: (record) => record?.name || record?.phoneNumber || "",
    },
    {
      title: "PTTT",
      dataIndex: "paymentMethod",
      render: (record) => PaymentMethodText[record],
    },

    {
      title: "Thanh toán",
      dataIndex: "paymentReality",
      render: (record) => (record ? formatMoney(record) : ""),
    },
    {
      title: "Thu ngân",
      dataIndex: "cashier",
      render: (record) => record?.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (record) => OrderStatusText[record],
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
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
              onClick={() => showModalDetail(item?.id)}
            />
          </>
        );
      },
    },
  ];

  const columnsDetail = [
    {
      title: "Mã món ăn",
      dataIndex: "dishId",
    },
    {
      title: "Tên món ăn",
      dataIndex: "dish",
      render: (record) => record.name,
    },
    {
      title: "Thời gian gọi",
      dataIndex: "createdAt",
      render: (record) => formatTime(record),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (record) => OrderStatusText[record],
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (record) => formatMoney(record),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Thành tiền",
      render: (record) => formatMoney(record.price * record.quantity),
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  const showModalDetail = (id) => {
    setVisible(true);
    dispatch(detailOrder(id));
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleChangeStatus = (item, isReject) => {
    let status;
    if (!isReject) {
      switch (item.status) {
        case OrderStatusEnum.WAITING_CONFIRM:
          status = OrderStatusEnum.CONFIRMED;
          break;
        case OrderStatusEnum.CONFIRMED:
          status = OrderStatusEnum.SHIPPING;
          break;
        case OrderStatusEnum.SHIPPING:
          status = OrderStatusEnum.RECEIVED;
          break;
        case OrderStatusEnum.RECEIVED:
          status = OrderStatusEnum.SUCCESS;
          break;
        default:
          break;
      }
    } else {
      status = OrderStatusEnum.REJECT;
    }

    dispatch(
      changeStatusOrder(item.id, { status }, () =>
        dispatch(listOrder({ page }))
      )
    );
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  return (
    <MainLayout>
      <h2>Danh sách đơn hàng</h2>
      <Table
        columns={columns}
        dataSource={state.order.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.order.meta.total}
        onChange={onChange}
      />

      <Modal
        title="Chi tiết đơn hàng"
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
      >
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={24} style={{ float: "right" }}>
              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" onClick={handlePrint}>
                  In hoá đơn
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <div
            ref={componentRef}
            style={{
              padding: 20,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Cửa hàng"
                  name="categoryId"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <b>Hadilao</b>
                </Form.Item>
                <Form.Item
                  label="Mã đơn hàng"
                  name="code"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.code}
                </Form.Item>
                {state.order.item?.table && (
                  <Form.Item
                    label="Bàn"
                    name="status"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {state.order.item?.table?.code}
                  </Form.Item>
                )}
                {state.order.item?.waitingTicket && (
                  <Form.Item
                    label="Phiếu"
                    name="status"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {state.order.item?.waitingTicket}
                  </Form.Item>
                )}
                <Form.Item
                  label="Trạng thái đơn hàng"
                  name="status"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {OrderStatusText[state.order.item?.status]}
                </Form.Item>
                <Form.Item
                  label="Loại thanh toán"
                  name="status"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {PaymentMethodText[state.order.item?.paymentMethod]}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Khách hàng"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.customer?.name}
                </Form.Item>
                <Form.Item
                  label="Loại đơn"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {OrderTypeText[state.order.item?.type]}
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.customer?.phoneNumber}
                </Form.Item>
                <Form.Item
                  label="Thu ngân"
                  name="note"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.cashier?.name}
                </Form.Item>
                <Form.Item
                  label="Ghi chú"
                  name="note"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.note}
                </Form.Item>
              </Col>
              <Col span={24}>
                <h3>Danh sách sản phẩm</h3>
                <Table
                  columns={columnsDetail}
                  dataSource={state.order.item.details}
                  pagination={false}
                />
              </Col>
              <Col span={16}></Col>
              <Col span={8}>
                <Form.Item
                  label="Tổng số tiền"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {formatMoney(
                    state.order.item?.details?.reduce((total, item) => {
                      if (item.status !== 2) return total;
                      return total + item?.price * item.quantity;
                    }, 0)
                  )}
                </Form.Item>
                <Form.Item
                  label="Dùng điểm"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.pointUsed + " điểm"}
                </Form.Item>
                <Form.Item
                  label="Thanh toán"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {formatMoney(state.order.item?.paymentReality)}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </MainLayout>
  );
}
