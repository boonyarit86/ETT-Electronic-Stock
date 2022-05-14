import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Button from "../../Components/Button/Button";
import Heading from "../../Components/Text/Heading";
import InputWithValidator from "../../Components/Input/InputWithValidator";
import Input from "../../Components/Input/Input";
import SelectTool from "../../Components/UIelements/SelectTool";
import SelectWithValidator from "../../Components/Select/SelectWithValidator";
import Toast from "../../Components/Toast/Toast";
import UploadOneImage from "../../Components/Button/UploadOneImage";
import { AuthContext } from "../../context/auth-context";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";
import { startLoading, endLoading } from "../../Redux/features/stateSlice";
import { setTts } from "../../Redux/features/ttsSlice";
import { setTcs } from "../../Redux/features/tcsSlice";
import { catchError, catchRequestError } from "../../utils/handleError";
import "./RequestBoard.css";
import ToastToolList from "../../Components/Toast/ToastToolList";

const RequestBoard = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ttsInSelect } = useSelector((state) => state.tts);
  const { tcs } = useSelector((state) => state.tcs);
  const { boards } = useSelector((state) => state.board);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [controller, setController] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [boardCode, setBoardCode] = useState("");
  const [boardType, setBoardType] = useState("");
  const [toolType, setToolType] = useState("");
  const [description, setDescription] = useState("");
  // selecTool Component
  const [boardSelected, setBoardSelected] = useState("");
  const [toolTotal, setToolTotal] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [insufficientToolList, setInsufficientToolList] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isToolEnough, setIsToolEnough] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      boardId: {
        value: "",
        isValid: false,
      },
    },
    {
      total: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (boards.length > 0) {
      let boardArr = [];
      boards.forEach((item) => {
        boardArr.push({ name: item.boardName, value: item._id });
      });
      setBoardList(boardArr);
    }
  }, [boards]);

  useEffect(() => {
    const {boardId, total} = formState.inputs;
    if (boardId.value !== "" || total?.value !== "") {
      setIsCheck(false);
      setInsufficientToolList([]);
      setToolList([]);
    }
  }, [formState.inputs]);

    console.log("Render!");

  //   if (isLoading) return <div />;
  //   if (!isLoading && requestError) {
  //     return (
  //       <div className="createTool">
  //         <Toast
  //           element="error"
  //           type="default"
  //           message={requestError}
  //           style={{ marginBottom: "1rem" }}
  //         />
  //       </div>
  //     );
  //   }

  const onSubmit = async (e) => {
    let menu = document.querySelectorAll(".sidebar__item");
    let newItemActive = document.getElementById("m5");
    e.preventDefault();
    const { boardId, total } = formState.inputs;
    let data = { total: total.value, description: description, tools: [] };
    if (insufficientToolList.length > 0) {
      insufficientToolList.forEach((item) => {
        data.tools.push({ tid: item.tid, total: item.total });
      });
    }
    if (toolList.length > 0) {
      toolList.forEach((item) => {
        data.tools.push({ tid: item.tid, total: item.total });
      });
    }

    try {
      dispatch(startLoading());

      await Axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/boards/request/${boardId.value}`,
        data,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      ).then((res) => {
        // menu.forEach((item) => {
        //   let isItemActive = item.getAttribute("class").includes("active");
        //   if (isItemActive) {
        //     item.classList.remove("active");
        //   }
        // });
        // newItemActive.classList.add("active");
        dispatch(endLoading());
        // navigate("/boardList");
      });
    } catch (error) {
      let mainElement = document.querySelector(".main");
      dispatch(endLoading());
      catchError(error, setErrorMessage);
      mainElement.scrollTo(0, 0);
    }

    setIsCheck(false);
    setInsufficientToolList([]);
    setToolList([]);
    setDescription("");
  };

  const onClickCheckBoard = async (e) => {
    // total, bid
    e.preventDefault();
    const { boardId, total } = formState.inputs;
    try {
      dispatch(startLoading());
      await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/check/${boardId.value}/${total.value}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      ).then((res) => {
        dispatch(endLoading());
        console.log(res.data.data);
        let insufficientTool = res.data.data.insufficientTool;
        let tools = res.data.data.tools;
        let toolEnough = [];
        let toolNotEnough = [];
        if (insufficientTool === 0) {
          setIsToolEnough(true);
        } else {
          setIsToolEnough(false);
        }
        tools.forEach((item) => {
          if (item.toolCalc >= 0) {
            toolEnough.push(item);
          } else {
            toolNotEnough.push(item);
          }
        });
        setInsufficientToolList(toolNotEnough);
        setToolList(toolEnough);
        setIsCheck(true);
      });
    } catch (error) {
      let mainElement = document.querySelector(".main");
      setIsCheck(false);
      dispatch(endLoading());
      catchError(error, setErrorMessage);
      mainElement.scrollTo(0, 0);
    }
  };

  return (
    <div className="requestBoard">
      <Heading type="main" text="เบิกบอร์ดและอุปกรณ์" className="u-mg-b" />
      {errorMessage && (
        <Toast
          element="error"
          type="default"
          message={errorMessage}
          style={{ marginBottom: "1rem" }}
          className="u-mg-b"
        />
      )}
      <div className="requestBoard__form">
        <SelectWithValidator
          label="ชื่อบอร์ด"
          id="boardId"
          placeholder="เลือกชื่อบอร์ด"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMessage="กรุณาเลือกชื่อบอร์ด"
          required
          fullWidth
          data={boardList}
        />
        <InputWithValidator
          element="input"
          type="number"
          label="จำนวนบอร์ด"
          id="total"
          placeholder="กรอกจำนวนบอร์ด"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorMessage="กรุณากรอกจำนวนบอร์ด"
          required
          fullWidth
        />
        <Input
          element="textarea"
          label="รายละเอียดเพิ่มเติม"
          id="description"
          placeholder="ข้อมูลอื่นๆที่เกี่ยวกับบอร์ด"
          setState={setDescription}
          state={description}
          fullWidth
        />
        <Button
          type="button"
          element="button"
          className="btn-secondary-purple"
          disabled={!formState.isValid}
          onClick={onClickCheckBoard}
          fullWidth
        >
          ตรวจสอบบอร์ดและอุปกรณ์
        </Button>

        {insufficientToolList.length > 0 && (
          <ToastToolList
            element="error"
            data={insufficientToolList}
            title="รายการอุปกรณ์ที่ไม่ครบ"
          />
        )}
        {toolList.length > 0 && (
          <ToastToolList
            element="success"
            data={toolList}
            title="รายการอุปกรณ์ที่ต้องใช้"
          />
        )}

        <Button
          type="button"
          element="button"
          className="btn-primary-blue"
          disabled={!formState.isValid || !isCheck}
          onClick={onSubmit}
          fullWidth
        >
          เบิกบอร์ดและอุปกรณ์
        </Button>
      </div>
    </div>
  );
};

export default RequestBoard;