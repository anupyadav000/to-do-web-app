import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/ToDo";
import Register from "./components/Register";
import Login from "./components/Login";
import { isCookieExpired } from "./utils/utils";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import { ToDoAppURL } from "./constants/contants";

function App() {
  const dispatch = useDispatch();

  const fetchToDoList = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token.length !== 0 && token !== "undefined") {
      axios
        .get(ToDoAppURL + "/toDo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: "SetList",
              list: res.data,
            });
          } else {
            alert(`error occurred in fetching to-do data ${res.data}`);
          }
        })
        .catch((err) => {
          alert(`error occurred in fetching to-do data: ${err.response.data}`);
        })
        .finally(() => {
          console.log("fetch to-do list promise completed");
        });
    } else {
      alert("no user set to fetch to-dos");
    }
  };

  useEffect(() => {
    const isTokenCookieExpired = isCookieExpired("token");
    if (isTokenCookieExpired === false) {
      fetchToDoList();
    }
    // eslint-disable-next-line
  }, []);

  const allFetchedToDos = useSelector((state) => state.toDos);

  return (
    <Box bgColor={"#222222"} color={"white"} width={"100%"} minHeight={"100vh"}>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              path="login"
              element={<Login fetchToDoList={fetchToDoList} />}
            ></Route>
            <Route
              path="register"
              element={<Register fetchToDoList={fetchToDoList} />}
            ></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="to-dos"
              element={
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <AddToDo fetchToDoList={fetchToDoList}></AddToDo>
                  <ToDoList
                    fetchedToDos={allFetchedToDos}
                    fetchToDoList={fetchToDoList}
                  ></ToDoList>
                </Box>
              }
            ></Route>
          </Routes>
        </Box>
        <Box>
          <Outlet></Outlet>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
