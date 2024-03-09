import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { ToDoAppURL } from "../constants/contants";

function AddToDo(props) {
  const [toDo, setToDo] = useState("");
  const handleAddToDo = () => {
    if (toDo.length === 0 || toDo === undefined) {
      alert("empty to-do can not be added");
      return;
    }
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token.length !== 0 && token !== "undefined") {
      axios
        .post(
          ToDoAppURL + "/toDo",
          { toDo: toDo },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            props.fetchToDoList();
          } else {
            alert(`error occurred in save to-do ${res}`);
          }
        })
        .catch((err) => {
          alert(`error occurred in save to-do: ${err.response.data}`);
        })
        .finally(() => {
          console.log("save to-do promise completed");
        });
    } else {
      alert("no user set to fetch to-dos");
    }
    setToDo("");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setToDo(value);
  };
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      paddingTop={"200px"}
    >
      <Input
        maxW={500}
        type="text"
        placeholder="my to-do"
        name="toDo"
        value={toDo}
        onChange={handleInputChange}
        marginBottom={{ base: "30px", lg: "0px" }}
      ></Input>
      <Button
        bgColor={"#1ED760"}
        _hover={{
          bgColor: "blue.200",
          transform: "scale(1.1)",
          fontSize: "20px",
        }}
        color={"black"}
        borderRadius={"30px"}
        onClick={handleAddToDo}
        marginLeft={{ base: "0px", lg: "30px" }}
        padding={"5px 40px"}
      >
        Add it
      </Button>
    </Box>
  );
}

export default AddToDo;
