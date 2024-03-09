import React, { useState } from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { ToDoAppURL } from "../constants/contants";

function ToDoListItem(props) {
  const [isBeingModified, setIsBeingModified] = useState(false);
  const [modifiedToDo, setModifiedToDo] = useState("");

  const handleSaveUpdatedToDo = (toDoNth) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token.length !== 0 && token !== "undefined") {
      const baseURL = ToDoAppURL + "/toDo";
      const requestURL = baseURL + "?toDo=" + toDoNth;
      axios
        .patch(
          requestURL,
          { newToDo: modifiedToDo },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            props.fetchToDoList();
            setIsBeingModified(false);
          } else {
            alert(`error occurred in updating to-do ${res.data}`);
          }
        })
        .catch((err) => {
          alert(`error occurred in updating to-do: ${err.response.data}`);
        })
        .finally(() => {
          console.log("update to-do promise completed");
        });
    } else {
      alert("no user set to fetch to-dos");
    }
  };

  const handleModifyToDo = (toDoNth) => {
    setModifiedToDo(toDoNth);
    setIsBeingModified(true);
  };

  const handleDeleteToDo = (toDoNth) => {
    setIsBeingModified(false);
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token.length !== 0 && token !== "undefined") {
      const baseURL = ToDoAppURL + "/toDo";
      const requestURL = baseURL + "?toDo=" + toDoNth;
      axios
        .delete(requestURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            props.fetchToDoList();
          } else {
            alert(`error occurred in deleting to-do ${res.data}`);
          }
        })
        .catch((err) => {
          alert(`error occurred in deleting to-do: ${err.response.data}`);
        })
        .finally(() => {
          console.log("delete to-do promise completed");
        });
    } else {
      alert("no user set to fetch to-dos");
    }
  };

  const handleNewToDoChange = (e) => {
    const { value } = e.target;
    setModifiedToDo(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={{ base: "smaller", lg: "6xl" }}
    >
      {isBeingModified ? (
        <Input
          margin="auto"
          ml={0}
          mr="10px"
          type="text"
          placeholder={props.toDo}
          onChange={handleNewToDoChange}
          name="newToDo"
          value={modifiedToDo}
          maxW={400}
        ></Input>
      ) : (
        <Text margin="auto" ml={0} mr="10px">
          {props.toDo}
        </Text>
      )}
      {isBeingModified ? (
        <Button
          onClick={() => handleSaveUpdatedToDo(props.toDo)}
          bgColor={"#1ED760"}
          _hover={{
            bgColor: "#1ED760",
            transform: "scale(1.1)",
            fontSize: "20px",
          }}
          color={"black"}
          borderRadius={"30px"}
          margin={"10px"}
          padding={"5px 40px"}
        >
          Save it
        </Button>
      ) : (
        <Button
          onClick={() => handleModifyToDo(props.toDo)}
          bgColor={"#1ED760"}
          _hover={{
            bgColor: "blue.200",
            transform: "scale(1.1)",
            fontSize: "20px",
          }}
          color={"black"}
          borderRadius={"30px"}
          margin={"10px"}
          padding={"5px 40px"}
        >
          Modify it
        </Button>
      )}
      <Button
        onClick={() => handleDeleteToDo(props.toDo)}
        bgColor={"#1ED760"}
        _hover={{
          bgColor: "red.300",
          transform: "scale(1.1)",
          fontSize: "20px",
        }}
        color={"black"}
        borderRadius={"30px"}
        margin={"10px"}
        padding={"5px 40px"}
      >
        Delete it
      </Button>
    </Box>
  );
}

export default ToDoListItem;
