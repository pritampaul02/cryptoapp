import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import {
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Radio,
    RadioGroup,
    Text,
    VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    };

    const paginationBtns = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}`
                );
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();
    }, [currency, page]);

    if (error) return <ErrorComponent message={"Error while fetching Coins"} />;

    return (
        <Container maxW={"container.xl"}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <RadioGroup value={currency} onChange={setCurrency} p={"4"}>
                        <HStack
                            justifyContent={"center"}
                            fontWeight={"semibold"}
                            spacing={"4"}
                        >
                            <Radio value="inr">₹ INR</Radio>
                            <Radio value="usd" fontWeight={"semibold"}>
                                $ USD
                            </Radio>
                            <Radio value="eur" fontWeight={"semibold"}>
                                € EUR
                            </Radio>
                        </HStack>
                    </RadioGroup>

                    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                        {coins.map((i) => (
                            <CoinCard
                                key={i.id}
                                id={i.id}
                                img={i.image}
                                symbol={i.symbol}
                                name={i.name}
                                currencySymbol={currencySymbol}
                                price={i.current_price}
                            />
                        ))}
                    </HStack>

                    <HStack
                        w={"full"}
                        overflowX={"auto"}
                        padding={"8"}
                        scrollBehavior={"smooth"}
                    >
                        {paginationBtns.map((item, index) => (
                            <Button
                                key={index}
                                bgColor={"blackAlpha.700"}
                                color={"white"}
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </HStack>
                </>
            )}
        </Container>
    );
};

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
    <Link to={`/coin/${id}`}>
        <VStack
            w={["36", "52"]}
            shadow={"lg"}
            p={["4", "8"]}
            borderRadius={"lg"}
            transition={"all 0.3s"}
            m={["2", "4"]}
            css={{ "&:hover": { transform: "scale(1.1)" } }}
        >
            <Image
                src={img}
                w={"10"}
                h={"10"}
                objectFit={"contain"}
                alt={"Exchange"}
            />
            <Heading
                size={["sm", "md"]}
                noOfLines={"1"}
                textTransform={"uppercase"}
            >
                {symbol}
            </Heading>
            <Heading size={["sm", "md"]} noOfLines={"1"}>
                {price ? `${currencySymbol} ${price}` : "NA"}
            </Heading>
            <Text noOfLines={"1"}>{name}</Text>
        </VStack>
    </Link>
);

export default Coins;
