import React from "react";
import "./bar.css";
import { Tooltip } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import PauseIcon from "@mui/icons-material/Pause";

class ProgressBarExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0,
      today: null,
      alldays: [],
      alldates: [],
      i: 0,
      id: 0,
      id2: 0,
      tooltipOpen: false,
      pause: false,
      resumerom: 0,
      tooltipOpen: false,
      time: 0,
      date: 0,
      daynum: 0,
      dd: 0,
      mm: 0,
      yyyy: 0,
      todaystr: this.props.todaystr,
      allDates: this.props.allDates,
      is_today_data_available: this.props.is_today_data_available,
    };

    this.nextStep = this.nextStep.bind(this);
    this.getday = this.getday.bind(this);
    this.get4days = this.get4days.bind(this);
    this.move = this.move.bind(this);
    this.frame = this.frame.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.reset = this.reset.bind(this);
    this.pause_or_resume = this.pause_or_resume.bind(this);
    this.getAllDates = this.getAllDates.bind(this);

    console.log("ProgressBarExample constructor");
  }

  componentDidMount() {
    console.log(" progress bar -- > componentDidMount");
    var today = new Date(); //Ex: Wed Aug 04 2021 14:49:37 GMT+0530 (India Standard Time)
    var dd = parseInt(String(today.getDate()).padStart(2, "0"));
    var mm = parseInt(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
    var yyyy = today.getFullYear();

    console.log(dd, mm, yyyy);
    // console.log("this.props.allDates -- " + this.state.allDates[0]);
    console.log("this.state.todaystr -- " + this.state.todaystr);
    this.setState({
      dd: dd,
      mm: mm,
      yyyy: yyyy,
    });
    var n = today.getDay(); // Ex: 3 for wednesday
    console.log("today.getDay() -- " + n);
    this.setState({ today: n, tooltipOpen: true });
    let day = this.getday(n);
    console.log(day);
    this.get4days(n);
    this.getAllDates(today);
  }

  getAllDates(today) {
    let allDates = [];
    for (let i = 0; i < 4; i++) {
      today.setDate(today.getDate() + i);
      allDates.push(today.toDateString().substring(4, 15));
    }
    this.setState({ alldates: allDates });
  }

  getday(n) {
    switch (n) {
      case 0:
        return "Sunday";

      case 1:
        return "Monday";

      case 2:
        return "Tuesday";

      case 3:
        return "Wednesday";

      case 4:
        return "Thursday";

      case 5:
        return "Friday";

      case 6:
        return "Saturday";

      default:
        break;
    }
  }

  get4days(n) {
    let temp = [];
    let today = new Date();
    for (let j = 0; j < 4; j++) {
      let temp_day = n + j >= 7 ? this.getday((n + j) % 7) : this.getday(n + j);

      today.setDate(today.getDate() + j);
      let temp_date = today.toDateString().substring(4, 15);
      today.setDate(today.getDate() - j);
      let temp_day_date_obj = { day: temp_day, date: temp_date };
      console.log(temp_day_date_obj);
      temp.push(temp_day_date_obj);
    }
    // temp.push(this.getday(n));
    // temp.push(n + 1 >= 7 ? this.getday((n + 1) % 7) : this.getday(n + 1));
    // temp.push(n + 2 >= 7 ? this.getday((n + 2) % 7) : this.getday(n + 2));
    // temp.push(n + 3 >= 7 ? this.getday((n + 3) % 7) : this.getday(n + 3));
    this.setState({ alldays: temp });
  }

  getNextTimeDate() {
    if (this.state.time === 21) {
      this.setState(prevState => ({ daynum: prevState.daynum + 1 }));
      this.setState(prevState => ({ time: 0, date: prevState.date + 1 }));
    } else {
      this.setState(prevState => ({ time: prevState.time + 3 }));
    }
  }

  nextStep() {
    if (this.state.percentage === 100) return;
    this.setState(prevState => ({
      percentage: prevState.percentage + 3.125,
    }));
    this.getNextTimeDate();
  }

  move() {
    if (this.state.i === 0) {
      this.setState({ i: 1 });
      // var elem = document.getElementById("myBar");
      this.setState({ percentage: 0, date: this.state.dd, time: 0 });
      var id = setInterval(this.frame, 100);
      this.setState({ id: id }, () => {
        console.log(this.state.id);
      });
    }
  }

  pause_or_resume() {
    if (this.state.pause) {
      console.log("pause_or_resume" + " if means Pause  == True");
      this.resume();
    } else {
      console.log("pause_or_resume" + " else means Pause  == False");
      this.pause();
    }
  }

  pause() {
    this.setState(prevState => ({
      pause: true,
      percentage: prevState.percentage,
      date: prevState.date,
      time: prevState.time,
    }));
    // this.props.setstate_for_progressbar();

    clearInterval(this.state.id);
  }

  resume() {
    if (!this.props.noTiffFiles) {
      // if tiff files are already present in the folder
      if (this.state.i === 0) {
        // running for the first time
        this.frame();

        this.setState({ i: 1 });
        // var elem = document.getElementById("myBar");
        this.setState({ percentage: 0, date: this.state.dd, time: 0 });
        var id = setInterval(this.frame, 2000);
        this.setState({ id: id }, () => {
          console.log("--->" + this.state.id);
        });
        // var id2 = setInterval(this.props.switchLayersToMap, 400);
        // this.setState({id2:id2});
      } else {
        // resuming as it was pause
        this.frame();
        this.setState({ pause: false, id: setInterval(this.frame, 2000) });
      }
    } else {
      alert("No forecast data available!");
    }
  }

  frame() {
    if (this.state.percentage >= 100) {
      // in the event of full progressbar
      clearInterval(this.state.id);
      this.setState({ i: 0 });
      //this.props.switchLayersToMap(true);
    } else {
      // width=width+3.125;
      this.setState(prevState => ({
        percentage: prevState.percentage + 3.125,
      }));
      //this.props.switchLayersToMap(false);
      this.getNextTimeDate();
    }
    this.props.switchLayersToMap();
  }

  reset() {
    this.setState({ percentage: 0, date: this.state.dd, time: 0 });
    this.props.reset_geotiff();
  }

  render() {
    return (
      <div style={{ position: "absolute", zIndex: 10000, width: "20vw" }}>
        <ProgressBar
          percentage={this.state.percentage}
          tooltipOpen={this.state.tooltipOpen}
          toggle={() => this.toggle}
          date={this.state.date}
          time={this.state.time}
          mm={this.state.mm}
          yyyy={this.state.yyyy}
        />

        <div
          style={{
            marginTop: "20px",
            position: "fixed",
            bottom: "5%",
            left: "3%",
            zIndex: "11",
          }}
        >
          {this.state.percentage === 0 || this.state.percentage === 100 ? (
            <button
              className="bar"
              style={{ zIndex: "10" }}
              onClick={this.resume}
            >
              <PlayArrowIcon />
            </button>
          ) : (
            <button
              className="bar"
              style={{ zIndex: "10" }}
              onClick={this.props.noTiffFiles ? null : this.pause_or_resume}
            >
              {this.state.pause ? <PlayArrowIcon /> : <PauseIcon />}
            </button>
          )}

          <button
            className="reset-btn"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              borderRadius: "100%",
            }}
            onClick={this.reset}
          >
            <ReplayIcon style={{ height: "15px", width: "15px" }} />
          </button>
        </div>

        <div className="progress-time row ">
          {this.state.alldays.map(day => (
            <div
              className="col d-flex justify-content-between"
              style={{ backgroundColor: "#aaa" }}
            >
              <span>*****************</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          ))}
        </div>
        <div className="progress-label row">
          {this.state.alldays.map(data => (
            <div className="column" style={{ backgroundColor: "#aaa" }}>
              {data.day} - {data.date}
              {/* {this.state.dd}/{this.state.mm}/{this.state.yyyy} */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProgressBarExample;

const ProgressBar = props => {
  // console.log(props.percentage)
  return (
    <span>
      <div className="progress-bar">
        <Filler percentage={props.percentage} />
        {props.percentage === 0 ? null : (
          <div className="tooltip">
            <Tooltip
              placement="top"
              isOpen={props.tooltipOpen}
              target="TooltipExample"
              aria-valuenow={props.percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              modifiers={{ offset: { offset: "100%", enabled: true } }}
            >
              {props.time +
                ":00hrs " +
                props.date +
                "/" +
                props.mm +
                "/" +
                props.yyyy}
            </Tooltip>
          </div>
        )}
      </div>
    </span>
  );
};

const Filler = props => {
  return (
    <div
      id="TooltipExample"
      className="filler"
      style={{ width: `${props.percentage}%` }}
    ></div>
  );
};
