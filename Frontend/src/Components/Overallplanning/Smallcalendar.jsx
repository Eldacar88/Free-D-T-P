import "./smallcalendar.css"
import React, {useEffect, useState, useContext} from "react";
import dayjs from "dayjs";
import GlobalContext from "../../Context/GlobalContext";
import Button from 'react-bootstrap/Button';
import { getMonth } from "./util";

const Smallcalendar = () => {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
      }, [currentMonthIdx]);

      const {
        monthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        daySelected,
      } = useContext(GlobalContext);

      useEffect(() => {
        setCurrentMonthIdx(monthIndex);
      }, [monthIndex]);

      function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
      }
      function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
      }

      function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
          return "nowDay";
        } else if (currDay === slcDay) {
          return "slcDay";
        } else {
          return "";
        }
      }

    return (
        <div className="smallcalendarcontainer">
            <header className="sc_headercontainer">
                <p className="headerparagraph">
                {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
                </p>

                <button className="buttonspan">
                    <Button variant="secondary" size="me" active onClick={handlePrevMonth}>
                    {"<"}
                    </Button>

                    <Button variant="secondary" size="me" active onClick={handleNextMonth}>
                        {">"}
                    </Button>
                </button>
            </header>

            <div className="minicalendarcontainer">
            {currentMonth[0].map((day, i) => (
              <span key={i} className="text_1">
                {day.format("dd").charAt(0)}
              </span>
            ))}

                {currentMonth.map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((day, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSmallCalendarMonth(currentMonthIdx);
                          setDaySelected(day);
                        }}
                        className={`smallcalendarday ${getDayClass(day)}`}
                      >
                        <span className="daytext">{day.format("D")}</span>
                      </button>
                    ))}
                  </React.Fragment>
                ))}

            </div>

        </div>
    )
}

export default Smallcalendar;