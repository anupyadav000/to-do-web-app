import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isCookieExpired } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const isTokenCookieExpired = isCookieExpired("token");
    if (isTokenCookieExpired === false) {
      navigate("/to-dos");
    }
  }, [navigate]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      textAlign={"center"}
      paddingTop={"10%"}
    >
      <Text
        fontSize={{ base: "3xl", lg: "6xl" }}
        fontWeight={"extrabold"}
        color={"white"}
      >
        Start Creating<br></br> To-Dos
      </Text>
      <Link to="/register">
        <Button color={"black"} width={"200px"} margin={"30px"}>
          Register
        </Button>
      </Link>
      <Link to="/login">
        <Button color={"black"} width={"200px"}>
          Login
        </Button>
      </Link>
    </Box>
  );
}

export default Home;
