import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import cryptoImg from "../assets/59620-cryptocurrency-bitcoin-free-frame.png";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <Box
            w={"full"}
            h={"85vh"}
            bgColor={"blackAlpha.800"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
        >
            <motion.div
                style={{
                    height: "80%",
                    width: "80%",
                }}
                animate={{
                    translateY: "20px",
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                <Image
                    w={"full"}
                    height={"full"}
                    objectFit={"contain"}
                    src={cryptoImg}
                    alt="Back image"
                />
            </motion.div>

            <Text
                textAlign={"center"}
                fontSize={"6xl"}
                fontWeight={"medium"}
                color={"white"}
                my={"-12"}
            >
                CryptoX
            </Text>
        </Box>
    );
};

export default Home;
