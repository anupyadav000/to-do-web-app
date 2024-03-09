import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ToDoListItem from "./ToDoListItem";
import { useNavigate } from "react-router-dom";
import { isCookieExpired } from "../utils/utils";

function ToDoList(props) {
  const navigate = useNavigate();
  const myToDos = props.fetchedToDos;

  useEffect(() => {
    const isTokenCookieExpired = isCookieExpired("token");
    if (isTokenCookieExpired === true) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box m={200} mt={20} ml={250}>
      {myToDos.map((toDoObject, index) => {
        return (
          <Box
            mt="20px"
            key={index}
            display={"flex"}
            flexDirection="row"
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Box fontSize={"3xl"} fontWeight={"extrabold"} marginRight={"30px"}>
              {index + 1}
              {"."}
            </Box>
            <ToDoListItem
              toDo={toDoObject.toDo}
              user={props.user}
              fetchToDoList={props.fetchToDoList}
            ></ToDoListItem>
          </Box>
        );
      })}
    </Box>
  );
}

export default ToDoList;
