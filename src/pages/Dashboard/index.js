import { Card, Col, Radio, Row, Statistic, Table } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../common/common";
import DateSelection, { reportTypeEnum } from "../../components/DateSelection";
import MainLayout from "../../containers/MainLayout";
import {
  dashboardCustomer,
  dashboardDish,
  dashboardOrder,
  dashboardRevenue,
  dashboardSummary,
} from "../../redux/actions/dashboard.action";
import { listDish, listDishSell } from "../../redux/actions/dish.action";

moment.locale("vi", {
  week: {
    dow: 1,
  },
});
moment.locale("vi");

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Thống kê doanh thu",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Thống kê đơn hàng",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Dashboard() {
  const [from, setFrom] = useState(moment().startOf("week"));
  const [to, setTo] = useState(moment().endOf("week"));
  const [from1, setFrom1] = useState(moment().startOf("week"));
  const [to1, setTo1] = useState(moment().endOf("week"));
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [timeType, setTimeType] = useState(reportTypeEnum.WEEK);
  const [timeType1, setTimeType1] = useState(reportTypeEnum.WEEK);

  useEffect(() => {
    const params = {
      startDate: from ? from.toISOString() : "",
      endDate: moment(to).startOf("day").toISOString(),
      timeType: timeType,
    };

    const params1 = {
      startDate: from1 ? from1.toISOString() : "",
      endDate: moment(to1).startOf("day").toISOString(),
      timeType: timeType1,
    };

    dispatch(listDish({ page: 1, orderView: -1, limit: 5 }));
    dispatch(dashboardSummary());
    dispatch(dashboardCustomer({ page: 1, limit: 5 }));
    dispatch(dashboardDish({ page: 1, limit: 5 }));
    dispatch(dashboardRevenue(params));
    dispatch(dashboardOrder(params1));
    dispatch(listDishSell({ page: 1, orderSell: -1, limit: 5 }));
  }, [dispatch]);

  const refreshData = () => {
    const params = {
      startDate: from ? from.toISOString() : "",
      endDate: moment(to).endOf("day").toISOString(),
      timeType: timeType,
    };
    dispatch(dashboardRevenue(params));
  };

  const refreshData1 = () => {
    const params = {
      startDate: from1 ? from1.toISOString() : "",
      endDate: moment(to1).endOf("day").toISOString(),
      timeType: timeType1,
    };
    dispatch(dashboardOrder(params));
  };

  useEffect(() => {
    refreshData();
  }, [from, to]);

  useEffect(() => {
    refreshData1();
  }, [from1, to1]);

  const data = {
    labels: state.dashboard.revenueStatistic.map((item) => item.time),
    datasets: [
      {
        label: "Doanh thu",
        data: state.dashboard.revenueStatistic.map((item) => item.totalAmount),
        borderColor: "#2ecc71",
        backgroundColor: "#2ecc71",
      },
    ],
  };

  const data1 = {
    labels: state.dashboard.orderStatistic.map((item) => item.time),
    datasets: [
      {
        label: "Đơn hàng",
        data: state.dashboard?.orderStatistic?.map((item) => item.total),
        borderColor: "#2ecc71",
        backgroundColor: "#2ecc71",
      },
    ],
  };

  const columns2 = [
    {
      title: "ID",
      dataIndex: "user_id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số tiền đã chi",
      dataIndex: "money",
      render: (record) => formatMoney(+record),
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "dish",
      render: (record) => record.id,
    },
    {
      title: "Tên món ăn",
      dataIndex: "dish",
      render: (record) => record.name,
    },
    {
      title: "Danh mục",
      dataIndex: "dish",
      render: (record) => record?.category?.name,
    },
    {
      title: "Lượt mua",
      dataIndex: "sold",
    },
  ];
  const columns1 = [
    {
      title: "ID",
      dataIndex: "customer",
      render: (record) => record.id,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      render: (record) => record.name,
    },
    {
      title: "Số điện thoại",
      dataIndex: "customer",
      render: (record) => record.phoneNumber,
    },
    {
      title: "Số tiền đã chi",
      dataIndex: "total",
      render: (record) => formatMoney(record),
    },
  ];

  const handleChangeDate = (start, end) => {
    setFrom(start);
    setTo(end);
  };

  const handleChangeDate1 = (start, end) => {
    setFrom1(start);
    setTo1(end);
  };

  return (
    <MainLayout>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={24}>
            <h2>Tổng quan</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số nhân viên"
                value={state.dashboard?.summary?.totalEmployee}
                valueStyle={{ color: "#3f8600" }}
                suffix="nhân viên"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số khách hàng"
                value={state.dashboard?.summary?.totalCustomer}
                valueStyle={{ color: "#3498db" }}
                suffix="khách hàng"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số bàn"
                value={state.dashboard?.summary?.totalTable}
                valueStyle={{ color: "#e74c3c" }}
                suffix="bàn"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số món ăn"
                value={state.dashboard?.summary?.totalDish}
                valueStyle={{ color: "#e74c3c" }}
                suffix="món"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Row justify="space-between">
              <h2>Thống kê doanh thu</h2>
              <TimeTypeSelect type={timeType} handleChangeType={setTimeType} />
            </Row>

            <Bar options={options} data={data} />
            <DateSelection handleChange={handleChangeDate} type={timeType} />
          </Col>
          <Col span={12}>
            <Row justify="space-between">
              <h2>Thống kê đơn hàng</h2>
              <TimeTypeSelect
                type={timeType1}
                handleChangeType={setTimeType1}
              />
            </Row>

            <Bar options={options1} data={data1} />
            <DateSelection handleChange={handleChangeDate1} type={timeType1} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <h2>Món ăn bán chạy</h2>
            <Table
              columns={columns}
              dataSource={state.dashboard.dishes}
              pagination={false}
            />
          </Col>
          <Col span={12}>
            <h2>Khách hàng tiềm năng</h2>
            <Table
              columns={columns1}
              dataSource={state.dashboard.customers}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export function TimeTypeSelect(props) {
  const { handleChangeType, type } = props;

  return (
    <Radio.Group
      value={type}
      onChange={(e) => handleChangeType(e.target.value)}
    >
      <Radio.Button value={reportTypeEnum.WEEK}>Tuần</Radio.Button>
      <Radio.Button value={reportTypeEnum.MONTH}>Quý</Radio.Button>
    </Radio.Group>
  );
}
