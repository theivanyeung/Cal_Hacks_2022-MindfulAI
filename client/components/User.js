import { useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

const User = (props) => {
  const [hover, setHover] = useState(false);

  const mouseEnterHandler = () => {
    setHover(true);
  };

  const mouseLeaveHandler = () => {
    setHover(false);
  };

  return (
    <Popover trigger={"hover"}>
      <PopoverTrigger>
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.1,
            },
          }}
        >
          <Box
            as={"button"}
            m={"10px"}
            w={"150px"}
            h={"150px"}
            borderRadius={"1000px"}
            overflow={"hidden"}
            filter={`drop-shadow(0px 0px ${
              10 + props.level
            }px rgba(255, 255, 255, ${0.5 + props.level * 0.1}))`}
            onMouseEnter={() => {
              mouseEnterHandler();
              props.hoverHandler();
            }}
            onMouseLeave={mouseLeaveHandler}
            onClick={props.clickHandler}
          >
            <Image
              src={props.photoURL}
              width={100}
              height={100}
              layout={"responsive"}
            />
          </Box>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent
        mr={"10px"}
        w={"150px"}
        h={"75px"}
        boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
        borderRadius={"12px"}
        bgColor={"rgba(255, 255, 255, 0.6)"}
        backdropFilter={"blur(10px)"}
        overflow={"hidden"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"100%"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.1em"}
          >
            {props.displayName}
          </Heading>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default User;
