import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
    return (
        <VStack h="90vh" justifyContent={"center"}>
            <Box transform={"scale(3)"}>
                <Spinner
                    size={"sm"}
                    thickness={"2px"}
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                />
            </Box>
        </VStack>
    );
};

export default Loader;
