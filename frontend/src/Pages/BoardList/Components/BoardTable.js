import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../Components/Avatar/Avatar";
import Button from "../../../Components/Button/Button";
import Column from "../../../Components/Table/Column";
import Row from "../../../Components/Table/Row";
import StatusText from "../../../Components/Tag/StatusText";
import Table from "../../../Components/Table/Table";
import Thead from "../../../Components/Table/Thead";
import Title from "../../../Components/Text/Title";
import Pagination from "../../../Components/Table/Pagination";
import { checkStatus } from "../../../utils/index";

const BoardTable = (props) => {
  const { state, handleOpenModal, setState, initialData } = props;
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Title className="table__title">ตารางรายการบอร์ด</Title>
      <Table>
        <Thead>
          {props.state.map((item, index) => (
            <React.Fragment key={index}>
              <Column minW={item.minW} maxW={item.maxW}>
                <p className="table__header-text">{item.name}</p>
              </Column>
            </React.Fragment>
          ))}
        </Thead>
        {props.data.length > 0 ? (
          props.data.map((item, index) => (
            <React.Fragment key={index}>
              <Row>
                <Column minW={state[0].minW} maxW={state[0].maxW}>
                  <Avatar
                    shape="square"
                    src={item?.avatar?.url ? item.avatar.url : null}
                    className="icon--large"
                  />
                </Column>
                <Column minW={state[1].minW} maxW={state[1].maxW}>
                  <p className="table__col-text">{item.boardName}</p>
                </Column>
                <Column minW={state[2].minW} maxW={state[2].maxW}>
                  <StatusText
                    text={checkStatus(item).text}
                    type={checkStatus(item).type}
                  />
                </Column>
                <Column minW={state[3].minW} maxW={state[3].maxW}>
                  <p className="table__col-text">{item.total}</p>
                </Column>
                <Column minW={state[4].minW} maxW={state[4].maxW}>
                  <p className="table__col-text">
                    {item?.boardCode ? item.boardCode : "ไม่ได้กำหนด"}
                  </p>
                </Column>
                <Column minW={state[5].minW} maxW={state[5].maxW}>
                  <p className="table__col-text">{item.type || "ไม่ได้กำหนด"}</p>
                </Column>
                <Column
                  minW={state[6].minW}
                  maxW={state[6].maxW}
                  className="table__col-btns"
                >
                  <Button
                    element="button"
                    type="button"
                    className="btn-primary-blue"
                    onClick={() => handleOpenModal("เบิก", item)}
                  >
                    เบิก
                  </Button>
                  {(user?.role === "admin" || user?.role === "staff") && (
                    <Button
                      element="button"
                      type="button"
                      className="btn-secondary-purple"
                      onClick={() => handleOpenModal("เพิ่ม", item)}
                    >
                      เพิ่ม
                    </Button>
                  )}
                  <Button
                    element="link"
                    type="button"
                    path={`/boardList/${item._id}`}
                    className="btn-primary-grey"
                  >
                    ดู
                  </Button>
                </Column>
              </Row>
            </React.Fragment>
          ))
        ) : (
          <Row>
            <div style={{ width: "100%", textAlign: "center" }}>
              ไม่พบข้อมูล
            </div>
          </Row>
        )}
      </Table>
        <Pagination
          data={props.data}
          setState={setState}
          initialData={initialData}
          className="u-mg-b"
        />
    </>
  );
};

export default BoardTable;
