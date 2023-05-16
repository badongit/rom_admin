import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import * as moment from "moment";

moment.locale("vi", {
  week: {
    dow: 1,
  },
});
moment.locale("vi");

const weeksInYear = (year) =>
  Math.max(
    moment(new Date(year, 11, 31)).isoWeek(),
    moment(new Date(year, 11, 31 - 7)).isoWeek()
  );

export const reportTypeEnum = {
  WEEK: 1,
  MONTH: 2,
};

const groupOptions = [
  {
    name: "Tuần",
    value: reportTypeEnum.WEEK,
  },
  {
    name: "Quý",
    value: reportTypeEnum.MONTH,
  },
];

const dateFormat = "DD/MM/YYYY";

const directionEnum = {
  up: "UP",
  down: "DOWN",
};

export default function DateSelection(props) {
  const { handleChange, type } = props;
  const [value, setValue] = useState();
  const [unit, setUnit] = useState(groupOptions[0]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const currentMonth = moment().month();
  const currentWeek = moment().isoWeek();
  const currentQuarter = moment().quarter();

  useEffect(() => {
    let time;
    switch (type) {
      case reportTypeEnum.WEEK:
        setUnit(groupOptions[0]);
        setValue(currentWeek);
        time = getStartAndEndDateOfUnit("week", currentWeek);
        break;
      case reportTypeEnum.MONTH:
        setUnit(groupOptions[1]);
        setValue(currentQuarter);
        time = getStartAndEndDateOfUnit("quarter", currentQuarter);
        break;
      default:
        setUnit(groupOptions[0]);
        setValue(currentWeek);
        time = getStartAndEndDateOfUnit("week", currentWeek);
        break;
    }
    setStartDate(time.start);
    setEndDate(time.end);
    handleChange(time.start, time.end);
  }, [currentMonth, currentQuarter, currentWeek, type, 0]);

  const getStartAndEndDateOfUnit = (unit, value) => {
    let isoYear = startDate ? moment(startDate).year() : moment().year();
    let maxUnit = unit === "week" ? weeksInYear(moment(startDate).year()) : 4;

    if (value > maxUnit) {
      value = 1;
      isoYear++;
    }
    let start, end;

    switch (unit) {
      case "week":
        start = moment()
          .isoWeekYear(isoYear)
          .utc()
          .isoWeek(value)
          .startOf(unit);
        end = moment().isoWeekYear(isoYear).utc().isoWeek(value).endOf(unit);
        break;
      case "quarter":
        start = moment()
          .isoWeekYear(isoYear)
          .utc()
          .quarter(value)
          .startOf(unit);
        end = moment().isoWeekYear(isoYear).utc().quarter(value).endOf(unit);
        break;
      default:
        start = moment()
          .isoWeekYear(isoYear)
          .utc()
          .isoWeek(value)
          .startOf(unit);
        end = moment().isoWeekYear(isoYear).utc().isoWeek(value).endOf(unit);
        break;
    }

    return { start, end, value };
  };

  const handleChangeValue = (direction) => {
    let newValue = value;
    if (direction === directionEnum.up) {
      newValue = value + 1;
    }
    if (direction === directionEnum.down) {
      newValue = value - 1;
    }

    const { start, end } = getStartAndEndDateOfUnit(
      type === reportTypeEnum.WEEK ? "week" : "quarter",
      newValue
    );
    if (start.isAfter(moment())) {
      return;
    }
    // eslint-disable-next-line default-case
    let valueFormat = +start.format(type === reportTypeEnum.WEEK ? "W" : "Q");

    setValue(valueFormat);
    setStartDate(start);
    setEndDate(end);
    handleChange(start, end);
  };

  return (
    <Row
      className="items-center justify-content-center"
      style={{ paddingBottom: 20, zIndex: 100000000000000 }}
    >
      <div
        className="date-select-filter"
        onClick={() => handleChangeValue(directionEnum.down)}
      >
        <LeftOutlined style={{ fontSize: "10px", opacity: "0.3" }} />
      </div>
      <div className="">
        <div className="text-center">
          <span className="date-select-head-text">
            {unit.name} {value}
          </span>
        </div>
        <div className="text-center">
          <span className="date-select-body-text">{`${startDate?.format(
            dateFormat
          )} - ${endDate?.format(dateFormat)}`}</span>
        </div>
      </div>
      <div
        className="date-select-filter"
        onClick={() => handleChangeValue(directionEnum.up)}
      >
        <RightOutlined style={{ fontSize: "10px", opacity: "0.3" }} />
      </div>
    </Row>
  );
}
