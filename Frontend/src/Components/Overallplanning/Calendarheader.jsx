import "./calendarheader.css"
import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import dayjs from "dayjs";
import logo from './logo.png';
import GlobalContext from "../../Context/GlobalContext";

const Calendarheader = ()=> {

    const {monthIndex, setMonthIndex} = useContext(GlobalContext);

    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
              ? monthIndex + Math.random()
              : dayjs().month()
          );
      }

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
        console.log("3");
      }
      function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
      }

    return(
        <div className="headercontainer">
            <img className="logo" src={logo} alt="calendar"/>
            <h1>Calendar</h1>

            <Button variant="secondary" size="me" active onClick={handleReset}>
                Today
            </Button>

            <Button variant="secondary" size="me" active onClick={handlePrevMonth}>
                {"<"}
            </Button>

            <Button variant="secondary" size="me" active onClick={handleNextMonth}>
                {">"}
            </Button>

            <h2 className="currentmonth">{dayjs(new Date (dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>

        </div>
    )
}

export default Calendarheader;