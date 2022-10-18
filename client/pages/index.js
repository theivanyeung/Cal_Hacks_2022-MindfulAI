import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Flex, Box, Heading, Input } from "@chakra-ui/react";

import axios from "axios";

const Access = () => {
  const router = useRouter();

  const [token, setToken] = useState("");

  const submitHandler = async (e) => {
    localStorage.setItem("token", JSON.stringify(token));
    console.log(token);
    console.log(JSON.stringify({ auth_key: token }));
    try {
      // axios({
      //   url: "http://localhost:8000/get_channels",
      //   method: "post",
      //   headers: {
      //     "Content-Type": null,
      //   },
      //   data: {
      //     auth_key: token,
      //   },
      // });
      const res = await fetch("http://localhost:8000/get_channels", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth_key: token }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (e) {
      console.log(e);
    }

    router.push("/home");
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"100vw"}
      h={"100vh"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"none"}
      bgAttachment={"fixed"}
      bgImage={"url('/images/login-background.png')"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"550px"}
        h={"450px"}
        borderRadius={"24px"}
        bgColor={"#36393F"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"80%"}
          h={"85%"}
        >
          <Image src={"/images/branding/logo.png"} width={150} height={20.29} />
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            h={"20%"}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"3xl"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              Connect your account!
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
              color={"#FFFFFF"}
            >
              We're so excited to see you again!
            </Heading>
          </Flex>
          <style jsx>{`
            form {
              width: 100%;
              height: 45%;
            }
          `}</style>
          <form onSubmit={submitHandler}>
            <Flex flexDirection={"column"} w={"100%"} h={"100%"}>
              <Input
                type={"text"}
                placeholder={"Your token..."}
                _placeholder={{
                  fontWeight: "300",
                  color: "#FFFFFF",
                  letterSpacing: "0.1em",
                }}
                mb={"30px"}
                h={"40px"}
                color={"#FFFFFF"}
                borderRadius={"12px"}
                onChange={(e) => setToken(e.target.value)}
              />
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"40px"}
                borderRadius={"12px"}
                bgImage={
                  "linear-gradient(91.63deg, #FFD299 16.24%, #FF29F8 105.16%)"
                }
              >
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"99.6%"}
                  h={"95%"}
                  borderRadius={"11px"}
                  bgColor={"#36393F"}
                  _hover={{
                    backgroundImage:
                      "linear-gradient(91.63deg, #FFD299 16.24%, #FF29F8 105.16%)",
                  }}
                  onClick={submitHandler}
                >
                  <Heading
                    fontWeight={"normal"}
                    fontSize={"xl"}
                    letterSpacing={"0.1em"}
                    color={"#FFFFFF"}
                  >
                    Access
                  </Heading>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Access;
