import { Button, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
// import { GoHome } from "react-icons/go";
// import { BsCoin, BsCurrencyExchange } from "react-icons/bs";

const Header = () => {
    return (
        <HStack
            py={"3"}
            px={["2", "16"]}
            shadow={"base"}
            bgColor={"blackAlpha.800"}
            justifyContent={"space-between"}
        >
            <HStack>
                <Heading fontSize={"2xl"} color={"white"}>
                    <Link to={"/"}>CryptoX</Link>
                </Heading>
            </HStack>

            <HStack gap={"8"}>
                <Button variant={"unstyled"} color={"white"}>
                    <Link to={"/"}>
                        {/* <GoHome /> */}
                        Home
                    </Link>
                </Button>

                <Button variant={"unstyled"} color={"white"}>
                    <Link to={"/coins"}>
                        {/* <BsCoin /> */}
                        Coins
                    </Link>
                </Button>

                <Button variant={"unstyled"} color={"white"}>
                    <Link to={"/exchanges"}>
                        {/* <BsCurrencyExchange /> */}
                        Exchanges
                    </Link>
                </Button>
            </HStack>
        </HStack>
    );
};

export default Header;
