import Image from "next/image";
import cohere from "cohere-ai";
import {
  Flex,
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import User from "../../components/User";

import { Users } from "../../components/contexts/faker";
import { useEffect, useState } from "react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState(Users[0]);
  const [messages, setMessages] = useState(Users[0].messages);

  const [output, setOutput] = useState([]);

  const calculate_level = (model1) => {
    if (model1 > 0.0 && model1 < 0.1) {
      return "light";
    } else if (model1 > 0.1 && model1 < 0.2) {
      return "medium";
    } else if (model1 > 0.2 && model1 < 0.3) {
      return "severe";
    } else {
      return "general";
    }
  };

  // init variable
  const get_suggestion = (API_KEY, model_one_input, model_two_input) => {
    cohere.init(API_KEY);
    let level = calculate_level(model_one_input);
    let topic = calculate_topic(model_two_input);
    let template_question =
      "What are some suggestions for people who are actively providing " +
      level +
      " levels of microaggression  to improve on their communication in messaging, specially with regards to " +
      topic +
      " and on how to reduce bias and prejudice against minority or marginalized " +
      topic +
      " effectively.";
    fuckAll(template_question);
  };

  const calculate_topic = (model2) => {
    /*
        race: 0.45 - 0.50
        class: 0.08 - 0.13
        gender: 0.32 - 0.37
        religion: 0.03 - 0.08
        */
    if (model2 > 0.45 && model2 < 0.5) {
      return "race";
    } else if (model2 > 0.08 && model2 < 0.13) {
      return "social class";
    } else if (model2 > 0.32 && model2 < 0.37) {
      return "gender";
    } else if (model2 > 0.03 && model2 < 0.08) {
      return "religion";
    } else {
      return "general";
    }
  };

  const fuckAll = async (template_question) => {
    const response = await cohere.generate({
      prompt: template_question,
      max_tokens: 150,
      model: "xlarge",
      temperature: 0.69,
      num_generations: 1,
    });
    let output = response.body.generations[0].text;
    let outputList = output.split(".");
    outputList.pop();
    output = outputList.join(".");

    console.log(`Suggestion: ${output}`);
    return output;
  };

  useEffect(() => {
    Users[5].messages.map((message) => {
      setOutput((prevOut) => [
        ...prevOut,
        get_suggestion(
          "u1GjOlQkie8QjnBCqeli4Ii4FVjIh6qQ6Xqt422I",
          message.micro_predictions,
          message.hate_predictions
        ),
      ]);
    });
    setOutput([]);
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100vw"}
      h={"100vh"}
      bgImage={
        "linear-gradient(107.56deg, #FFEED5 0%, rgba(227, 154, 159, 0.92) 67.19%, rgba(253, 84, 255, 0.77) 100%)"
      }
    >
      <Button onClick={() => console.log(output)}>lol</Button>
      <Image src={"/images/branding/logo.png"} width={183} height={24.75} />
      <Flex
        mt={"200px"}
        mb={"300px"}
        w={"50%"}
        justify={"center"}
        flexWrap={"wrap"}
      >
        {Users.map((user, index) => (
          <User
            key={index}
            photoURL={user.avatar}
            displayName={user.username}
            clickHandler={onOpen}
            hoverHandler={() => {
              setUser(user);
              setMessages(user.messages);
            }}
          />
        ))}
      </Flex>

      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bgColor={"rgba(77, 70, 79, 0.9)"}
          boxShadow={"0px 0px 50px rgba(255, 255, 255, 1)"}
          borderRadius={"24px"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"95%"}
              h={"85vh"}
              overflowX={"hidden"}
              overflowY={"auto"}
              sx={{
                "::-webkit-scrollbar": {
                  width: "5px",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#777777",
                  borderRadius: "10px",
                },
              }}
            >
              <Flex justifyContent={"center"} alignItems={"center"} my={"15px"}>
                <Box
                  w={"50px"}
                  h={"50px"}
                  borderRadius={"100px"}
                  overflow={"hidden"}
                  filter={"drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.5))"}
                >
                  <Image src={user.avatar} width={100} height={100} />
                </Box>
                <Heading
                  ml={"20px"}
                  textAlign={"left"}
                  fontWeight={"normal"}
                  fontSize={"xl"}
                  letterSpacing={"0.1em"}
                  color={"#FFFFFF"}
                >
                  {user.username}
                </Heading>
              </Flex>
              {output &&
                messages.map((message, index) => (
                  <Flex
                    key={index}
                    my={"20px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"95%"}
                    borderRadius={"24px"}
                    bgColor={"rgba(255, 255, 255, 0.25)"}
                  >
                    <Flex
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      w={"97%"}
                      p={"10px"}
                    >
                      <Heading
                        fontWeight={"light"}
                        fontSize={"xs"}
                        letterSpacing={"0.1em"}
                        color={"#FFFFFF"}
                      >
                        {message.timestamp}
                      </Heading>
                      <Heading
                        mt={"5px"}
                        paddingY={"8px"}
                        fontWeight={"medium"}
                        fontSize={"md"}
                        textAlign={"left"}
                        lineHeight={"24px"}
                        letterSpacing={"0.1em"}
                        color={"#FFFFFF"}
                      >
                        {message.text}
                      </Heading>

                      <Flex justifyContent={"center"} alignItems={"center"}>
                        <Flex
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"75px"}
                          h={"25px"}
                          borderRadius={"8px"}
                          bgColor={() => {
                            if (message.tags === "race") {
                              return "rgba(255, 64, 64, 0.5)";
                            }
                            if (message.tags === "gender") {
                              return "rgba(225, 85, 248, 0.5)";
                            }
                            if (message.tags === "class") {
                              return "rgba(255, 243, 132, 0.5)";
                            }
                          }}
                        >
                          <Heading
                            fontWeight={"normal"}
                            fontSize={"md"}
                            letterSpacing={"0.1em"}
                            color={"#FFFFFF"}
                          >
                            {message.tags}
                          </Heading>
                        </Flex>
                        <Heading
                          ml={"20px"}
                          fontWeight={"normal"}
                          fontSize={"xs"}
                          letterSpacing={"0.1em"}
                          color={"#FFFFFF"}
                        >
                          {message.hate_predictions}
                        </Heading>
                      </Flex>
                      <Heading
                        mt={"15px"}
                        ml={"10px"}
                        px={"10px"}
                        fontWeight={"normal"}
                        fontSize={"md"}
                        letterSpacing={"0.1em"}
                        lineHeight={"20px"}
                        color={"#FFFFFF"}
                        bgColor={"rgba(255, 255, 255, 0.25)"}
                        borderRadius={"12px"}
                      >
                        {message.suggestions}
                      </Heading>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Home;
