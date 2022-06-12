import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import { useState } from "react";

import { Box } from "@mui/system";
import * as React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Axios from "axios";
import "./featuredInfo.css";

const Barchart = () => {
  const [bsit, setBsit] = useState(0);
  const [bse, setBse] = useState(0);
  const [bsa, setBsa] = useState(0);
  const [bsab, setBsab] = useState(0);
  const [bsc, setBsc] = useState(0);
  const [bsf, setBsf] = useState(0);
  const [bslea, setBslea] = useState(0);
  const [msf, setMsf] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(6);

  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sept, setSept] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  ///------=====BSIT====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBsit", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBsit(0);
      } else {
        setBsit(response.data.length);
      }
    });
  });
  ///------=====BSE====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBse", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBse(0);
      } else {
        setBse(response.data.length);
      }
    });
  });
  ///------=====BSA====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBsa", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBsa(0);
      } else {
        setBsa(response.data.length);
      }
    });
  });
  ///------=====BSAB====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBsab", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBsab(0);
      } else {
        setBsab(response.data.length);
      }
    });
  });
  ///------=====BSC====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBsc", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBsc(0);
      } else {
        setBsc(response.data.length);
      }
    });
  });
  ///------=====BSLEA====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBslea", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBslea(0);
      } else {
        setBslea(response.data.length);
      }
    });
  });
  ///------=====BSF====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countBsf", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setBsf(0);
      } else {
        setBsf(response.data.length);
      }
    });
  });
  ///------=====MSF====---------------------------------
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countmsf", {
      year: year,
      month: month,
    }).then((response) => {
      if (response.data.message === "failed") {
        setMsf(0);
      } else {
        setMsf(response.data.length);
      }
    });
  });
  ///------==--=--=-=-=-==-=--=-=books=====-=-=-
  React.useState(() => {
    Axios.get("  http://localhost:8000/api/countbook").then((response) => {
      setTotalBooks(response.data.length);
    });
  }, []);
  //--------------jan--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countjan", {
      year: year,
    }).then((response) => {
      if (response.data.message === "failed") {
        setJan(0);
      } else {
        setJan(response.data.length);
      }
    });
  });
  //--------------feb--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countfeb", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setFeb(0);
        } else {
          setFeb(response.data.length);
        }
      }
    );
  });
  //--------------march--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countmar", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setMar(0);
        } else {
          setMar(response.data.length);
        }
      }
    );
  });
  //--------------apr--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countapr", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setApr(0);
        } else {
          setApr(response.data.length);
        }
      }
    );
  });
  //--------------may--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countmay", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setMay(0);
        } else {
          setMay(response.data.length);
        }
      }
    );
  });
  //--------------jun--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countjun", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setJun(0);
        } else {
          setJun(response.data.length);
        }
      }
    );
  });
  //--------------jul--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countjul", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setJul(0);
        } else {
          setJul(response.data.length);
        }
      }
    );
  });
  //--------------aug-------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countaug", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setAug(0);
        } else {
          setAug(response.data.length);
        }
      }
    );
  });
  //--------------sept--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countsept", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setSept(0);
        } else {
          setSept(response.data.length);
        }
      }
    );
  });
  //--------------oct--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countoct", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setOct(0);
        } else {
          setOct(response.data.length);
        }
      }
    );
  });
  //--------------nov--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countnov", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setNov(0);
        } else {
          setNov(response.data.length);
        }
      }
    );
  });
  //--------------dec--------------------=-==---
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countdec", { year: year }).then(
      (response) => {
        if (response.data.message === "failed") {
          setDec(0);
        } else {
          setDec(response.data.length);
        }
      }
    );
  });
  // ----------------pie--------------------------

  const state = {
    labels: [
      "BSIT - " + bsit,
      "BSE - " + bse,
      "BSA- " + bsa,
      "BSAB - " + bsab,
      "BSC - " + bsc,
      "BSF - " + bsf,
      "BSLEA - " + bslea,
      "MSF - " + msf,
    ],
    datasets: [
      {
        label: "Most log in students",
        backgroundColor: [
          "#b388ff",
          "#ffea00",
          "#00e676",
          "#b2ff59",
          "#dd2c00",
          "#2196f3",
          "#f44336",
          "#607d8b",
        ],

        data: [bsit, bse, bsa, bsab, bsc, bsf, bslea, msf],
      },
    ],
  };
  //-----=-==-=-=-==bar----=-==-------=-=-----=-
  const mvisits = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Monthly Visits",
        backgroundColor: ["#69f0ae"],

        data: [jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec],
      },
    ],
  };
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="featured">
        <Box width={600}>
          <div className="title">
            <h4>Users Visits</h4>
          </div>
          <Bar data={mvisits} />
        </Box>
        <Box width={400}>
          <div>
            <h4>Departments Who Visited This Month </h4>
          </div>

          <Pie data={state} />
        </Box>
      </div>
    </LocalizationProvider>
  );
};
export default Barchart;
