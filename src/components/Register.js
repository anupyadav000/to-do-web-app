import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ValidateFields } from "../utils/utils";
import { ToDoAppURL } from "../constants/contants";

function Register(props) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const setName = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      name: e.target.value,
    }));
  };

  const setEmail = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      email: e.target.value,
    }));
  };

  const setPassword = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      password: e.target.value,
    }));
  };

  const [registerError, setRegisterError] = useState("");

  const onSubmitForm = () => {
    const user = {
      name: details.name,
      email: details.email,
      password: details.password,
    };

    setRegisterError("");

    if (ValidateFields(user) === false) {
      setRegisterError("please provide valid login details");
      return;
    }

    const baseURL = ToDoAppURL + "/user/register";
    axios
      .post(baseURL, user)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          document.cookie = `token=${res.data.token}; path=/;`;
          navigate("/to-dos");
        } else {
          alert(`error occurred in registering user ${res.data}`);
        }
      })
      .catch((err) => {
        alert(`error occurred in registering user : ${err.response.data}`);
      })
      .finally(() => {
        console.log("register user promise completed");
      });
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      paddingTop={"10%"}
      paddingBottom={"10%"}
      color={"white"}
    >
      <Box
        display={"flex"}
        minW={"50%"}
        flexDirection={"column"}
        alignItems={"center"}
        bgColor={"#000000"}
        borderRadius={"10px"}
        padding={"50px"}
        fontWeight={"extrabold"}
        fontSize={"small"}
        color={"white"}
      >
        <Box>
          <Text fontSize={{ base: "2xl", lg: "5xl" }}>
            Sign up to start <br></br> Creating
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
          width={"60%"}
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="string"
            _autofill={"true"}
            value={details.name}
            onChange={setName}
            border={"1px solid #717171"}
          ></Input>
          <FormLabel marginTop={"20px"}>Email</FormLabel>
          <Input
            type="email"
            value={details.email}
            _autofill={"true"}
            onChange={setEmail}
            border={"1px solid #717171"}
          ></Input>
          <FormLabel marginTop={"20px"}>Password</FormLabel>
          <Input
            type="password"
            value={details.password}
            _autofill={"true"}
            onChange={setPassword}
            border={"1px solid #717171"}
          ></Input>
          <Box height={"50px"} padding={"15px"}>
            {registerError.length !== 0 && (
              <Text color={"red.900"} fontWeight={"extrabold"}>
                {registerError}
              </Text>
            )}
          </Box>
          <Button
            onClick={onSubmitForm}
            bgColor={"#1ED760"}
            color={"black"}
            padding={"25px"}
            borderRadius={"30px"}
            fontSize={"2xl"}
            marginBottom={"30px"}
            _hover={{
              bgColor: "#1ED760",
              transform: "scale(1.1)",
              fontSize: "20px",
            }}
          >
            Register
          </Button>
        </Box>
        <Box>
          <hr></hr>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={{ base: "80%", lg: "60%" }}
        >
          <Button
            bgColor={"#000000"}
            margin={"10px"}
            border={"1px solid #717171"}
            _hover={{ bgColor: "#000000" }}
            padding={"30px"}
            fontSize={{ base: "sm", lg: "xl" }}
          >
            Singup with Google
          </Button>
          <Button
            bgColor={"#000000"}
            margin={"10px"}
            border={"1px solid #717171"}
            _hover={{ bgColor: "#000000" }}
            padding={"30px"}
            fontSize={{ base: "sm", lg: "xl" }}
          >
            Singup with Facebook
          </Button>
          <Button
            bgColor={"#000000"}
            margin={"10px"}
            border={"1px solid #717171"}
            _hover={{ bgColor: "#000000" }}
            padding={"30px"}
            fontSize={{ base: "sm", lg: "xl" }}
          >
            Singup with Apple
          </Button>
        </Box>
        <Box>
          <hr></hr>
        </Box>
        <Box marginTop={"30px"}>
          <Text display={"inline"} color={"#A7A7A7"}>
            Already have a account?
          </Text>
          <Text display={"inline"} marginLeft={"5px"}>
            <Link to="/login">Log in here</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
