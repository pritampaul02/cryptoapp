import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
    return (
        <Box
            w={"full"}
            minH={"48"}
            bgColor={"blackAlpha.800"}
            px={"16"}
            py={["16", "8"]}
            color={"whiteAlpha.700"}
            shadow={"xs"}
        >
            <Stack
                h={"full"}
                direction={["column", "row"]}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <VStack w={"sm"} alignItems={["center", "flex-start"]}>
                    <Text fontWeight={"bold"}>About US</Text>
                    <Text
                        fontSize={"sm"}
                        letterSpacing={"widest"}
                        textAlign={["center", "left"]}
                    >
                        We are the best site for give you the current merket
                        price appropriately.You can get all cryptocurreny's list
                        hare.
                    </Text>
                </VStack>

                <VStack>
                    <Avatar boxSize={"28"} mt={["4", "0"]} />
                    <Text fontSize={"sm"}>
                        Created By{" "}
                        <a
                            href="https://github.com/pritampaul02"
                            target="blank"
                        >
                            Pritam
                        </a>
                    </Text>
                </VStack>
            </Stack>
        </Box>
    );
};

export default Footer;
