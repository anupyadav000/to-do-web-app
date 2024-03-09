import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ValidateFields } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToDoAppURL } from "../constants/contants";

function ForgotPassword() {
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

  const [resetError, setResetError] = useState("");

  const onSubmitForm = () => {
    const newUser = {
      name: details.name,
      email: details.email,
      password: details.password,
    };
    setResetError("");

    if (ValidateFields(newUser) === false) {
      setResetError("please provide valid re-set details");
      return;
    }

    // eslint-disable-next-line no-useless-concat
    const baseURL = ToDoAppURL + "/user" + "?email=" + newUser.email;
    axios
      .patch(baseURL, newUser)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          alert("User Details Are Updated Successfully");
          navigate("/login");
        } else {
          alert(`error occurred in re-setting user details ${res.data}`);
        }
      })
      .catch((err) => {
        alert(
          `error occurred in re-setting user details: ${err.response.data}`
        );
      })
      .finally(() => {
        console.log("re-set user promise completed");
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
      >
        <Box fontSize={"4xl"} marginBottom={"50px"}>
          <Text>Update Your Details</Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
          width={"60%"}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={details.email}
            onChange={setEmail}
            placeholder="Email ..."
          ></Input>
          <FormLabel marginTop={"20px"}>New Name</FormLabel>
          <Input
            type="text"
            value={details.name}
            onChange={setName}
            placeholder="Name ..."
          ></Input>
          <FormLabel marginTop={"20px"}>New Password</FormLabel>
          <Input
            type="password"
            value={details.password}
            onChange={setPassword}
            placeholder="Password ..."
          ></Input>
          <Box height={"50px"} padding={"15px"}>
            {resetError.length !== 0 && (
              <Text color={"red.900"} fontWeight={"extrabold"}>
                {resetError}
              </Text>
            )}
          </Box>
          <Button
            onClick={onSubmitForm}
            bgColor={"#1ED760"}
            color={"black"}
            padding={"25px"}
            borderRadius={"30px"}
            _hover={{
              bgColor: "#1ED760",
              transform: "scale(1.1)",
              fontSize: "20px",
            }}
          >
            Set New Password
          </Button>
          <Box margin={"20px"} fontSize={"larger"} textAlign={"center"}>
            <a href="login" alt="tmp">
              Still remember your Password ?
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
