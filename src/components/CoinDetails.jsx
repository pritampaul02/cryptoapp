import {
    Badge,
    Box,
    Button,
    Container,
    HStack,
    Image,
    Progress,
    Radio,
    RadioGroup,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "..";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
    const params = useParams();
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");

    const [days, setDays] = useState("24h");
    const [chartArray, setChartArray] = useState([]);

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const dayBtns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

    const SwitchChartStarts = (key) => {
        switch (key) {
            case "24h":
                setDays("24h");
                setLoading(true);
                break;
            case "7d":
                setDays("7d");
                setLoading(true);
                break;
            case "14d":
                setDays("14d");
                setLoading(true);
                break;
            case "30d":
                setDays("30d");
                setLoading(true);
                break;
            case "60d":
                setDays("60d");
                setLoading(true);
                break;
            case "200d":
                setDays("200d");
                setLoading(true);
                break;
            case "1y":
                setDays("365d");
                setLoading(true);
                break;
            case "max":
                setDays("max");
                setLoading(true);
                break;

            default:
                setDays("24h");
                setLoading(true);
                break;
        }
    };

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/${params.id}`
                );

                const { data: chartData } = await axios.get(
                    `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
                );

                setCoin(data);
                setChartArray(chartData.prices);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoin();
    }, [params.id, currency, days]);

    if (error) return <ErrorComponent message={"Error while fetching Coin"} />;

    return (
        <Container maxW={"container.xl"}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* chart will be displayed hare */}

                    <Box width={"full"} borderWidth={1}>
                        <Chart
                            arr={chartArray}
                            currency={currencySymbol}
                            days={days}
                        />
                    </Box>

                    {/* Button --for day wise update */}

                    <HStack p={"4"} overflowX={"auto"} alignItems={"center"}>
                        {dayBtns.map((i) => (
                            <Button
                                key={i}
                                onClick={() => SwitchChartStarts(i)}
                            >
                                {i}
                            </Button>
                        ))}
                    </HStack>

                    {/* Currency radio buttons --for currency change  */}

                    <RadioGroup value={currency} onChange={setCurrency} p={"4"}>
                        <HStack
                            justifyContent={"center"}
                            fontWeight={"semibold"}
                            spacing={"4"}
                        >
                            <Radio value="inr" fontWeight={"semibold"}>
                                ₹ INR
                            </Radio>
                            <Radio value="usd" fontWeight={"semibold"}>
                                $ USD
                            </Radio>
                            <Radio value="eur" fontWeight={"semibold"}>
                                € EUR
                            </Radio>
                        </HStack>
                    </RadioGroup>

                    <VStack
                        spacing={"4"}
                        padding="16"
                        alignItems={"flex-start"}
                    >
                        <Text
                            fontSize={"small"}
                            alignSelf="center"
                            opacity={0.7}
                        >
                            Last updated on{" "}
                            {Date(coin.last_updated).split("G")[0]}
                        </Text>

                        <HStack alignSelf={"center"}>
                            <Image
                                src={coin.image.large}
                                w={"24"}
                                h={"24"}
                                objectFit={"contain"}
                            />
                            <Stat px={"2"}>
                                <StatLabel fontSize={"xl"} fontWeight={"bold"}>
                                    {coin.name}
                                </StatLabel>
                                <StatNumber fontSize={"md"}>
                                    {currencySymbol}
                                    {coin.market_data.current_price[currency]}
                                </StatNumber>
                                <StatHelpText
                                    color={
                                        coin.market_data
                                            .price_change_percentage_24h > 0
                                            ? "green"
                                            : "red"
                                    }
                                    fontWeight={"semibold"}
                                >
                                    <StatArrow
                                        type={
                                            coin.market_data
                                                .price_change_percentage_24h > 0
                                                ? "increase"
                                                : "decrease"
                                        }
                                    />
                                    {
                                        coin.market_data
                                            .price_change_percentage_24h
                                    }
                                    %
                                </StatHelpText>
                            </Stat>
                            <Badge
                                fontSize={"xl"}
                                bgColor={"blackAlpha.700"}
                                borderRadius={"full"}
                                color={"white"}
                                px={"2"}
                            >
                                {`#${coin.market_cap_rank}`}
                            </Badge>
                        </HStack>

                        <Custombar
                            high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                            low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                        />

                        <Box w={"full"} p={"4"}>
                            <Item
                                title={"max supply"}
                                // value={coin.market_data.max_supply}
                                value={
                                    coin.market_data.max_supply >= 0
                                        ? `${coin.market_data.max_supply}`
                                        : "null"
                                }
                            />
                            <Item
                                title={"Circulating supply"}
                                value={
                                    coin.market_data.max_supply >= 0
                                        ? `${coin.market_data.circulating_supply}`
                                        : "null"
                                }
                            />
                            <Item
                                title={"Market cap"}
                                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                            />
                            <Item
                                title={"All time Low"}
                                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                            />
                            <Item
                                title={"All time High"}
                                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                            />
                        </Box>
                    </VStack>
                </>
            )}
        </Container>
    );
};

const Item = ({ title, value }) => {
    return (
        <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
            <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
                {title}
            </Text>
            <Text>{value}</Text>
        </HStack>
    );
};

const Custombar = ({ high, low }) => (
    <VStack w={"full"}>
        <Progress
            value={50}
            colorScheme={"teal"}
            w={"full"}
            borderRadius={"full"}
        />
        <HStack width={"full"} justifyContent={"space-between"}>
            <Badge children={low} colorScheme={"red"} />
            <Text fontSize={"sm"}>Range 24h</Text>
            <Badge children={high} colorScheme={"green"} />
        </HStack>
    </VStack>
);

export default CoinDetails;
