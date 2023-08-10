import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const ErrorComponent = ({ message }) => {
    return (
        <Alert
            status="error"
            position={"fixed"}
            bottom={"9"}
            left={"50%"}
            w={["full", "container.lg"]}
            px={["4", " "]}
            transform={"translateX(-50%)"}
            borderRadius={"2xl"}
        >
            <AlertIcon />
            {message}
        </Alert>
    );
};

export default ErrorComponent;
