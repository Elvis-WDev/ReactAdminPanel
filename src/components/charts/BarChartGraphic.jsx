import { useTheme } from "@emotion/react";
import { ResponsiveBar } from "@nivo/bar"
import { tokens } from "../../theme";



export const BarChartGraphic = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsiveBar
            data={
                [
                {
                    "country": "AD",
                    "hot dog": 119,
                    "hot dogColor": "hsl(167, 70%, 50%)",
                    "burger": 2,
                    "burgerColor": "hsl(241, 70%, 50%)",
                    "sandwich": 15,
                    "sandwichColor": "hsl(328, 70%, 50%)",
                    "kebab": 197,
                    "kebabColor": "hsl(310, 70%, 50%)",
                    "fries": 44,
                    "friesColor": "hsl(186, 70%, 50%)",
                    "donut": 11,
                    "donutColor": "hsl(55, 70%, 50%)"
                },
                {
                    "country": "AE",
                    "hot dog": 28,
                    "hot dogColor": "hsl(326, 70%, 50%)",
                    "burger": 24,
                    "burgerColor": "hsl(335, 70%, 50%)",
                    "sandwich": 171,
                    "sandwichColor": "hsl(79, 70%, 50%)",
                    "kebab": 197,
                    "kebabColor": "hsl(183, 70%, 50%)",
                    "fries": 198,
                    "friesColor": "hsl(221, 70%, 50%)",
                    "donut": 58,
                    "donutColor": "hsl(173, 70%, 50%)"
                },
                {
                    "country": "AF",
                    "hot dog": 14,
                    "hot dogColor": "hsl(304, 70%, 50%)",
                    "burger": 170,
                    "burgerColor": "hsl(325, 70%, 50%)",
                    "sandwich": 58,
                    "sandwichColor": "hsl(321, 70%, 50%)",
                    "kebab": 104,
                    "kebabColor": "hsl(258, 70%, 50%)",
                    "fries": 92,
                    "friesColor": "hsl(347, 70%, 50%)",
                    "donut": 192,
                    "donutColor": "hsl(348, 70%, 50%)"
                },
                {
                    "country": "AG",
                    "hot dog": 132,
                    "hot dogColor": "hsl(67, 70%, 50%)",
                    "burger": 95,
                    "burgerColor": "hsl(202, 70%, 50%)",
                    "sandwich": 52,
                    "sandwichColor": "hsl(131, 70%, 50%)",
                    "kebab": 74,
                    "kebabColor": "hsl(39, 70%, 50%)",
                    "fries": 86,
                    "friesColor": "hsl(36, 70%, 50%)",
                    "donut": 44,
                    "donutColor": "hsl(173, 70%, 50%)"
                },
                {
                    "country": "AI",
                    "hot dog": 34,
                    "hot dogColor": "hsl(326, 70%, 50%)",
                    "burger": 53,
                    "burgerColor": "hsl(283, 70%, 50%)",
                    "sandwich": 153,
                    "sandwichColor": "hsl(99, 70%, 50%)",
                    "kebab": 196,
                    "kebabColor": "hsl(256, 70%, 50%)",
                    "fries": 158,
                    "friesColor": "hsl(268, 70%, 50%)",
                    "donut": 127,
                    "donutColor": "hsl(44, 70%, 50%)"
                },
                {
                    "country": "AL",
                    "hot dog": 176,
                    "hot dogColor": "hsl(34, 70%, 50%)",
                    "burger": 139,
                    "burgerColor": "hsl(317, 70%, 50%)",
                    "sandwich": 107,
                    "sandwichColor": "hsl(210, 70%, 50%)",
                    "kebab": 126,
                    "kebabColor": "hsl(52, 70%, 50%)",
                    "fries": 160,
                    "friesColor": "hsl(334, 70%, 50%)",
                    "donut": 38,
                    "donutColor": "hsl(29, 70%, 50%)"
                },
                {
                    "country": "AM",
                    "hot dog": 121,
                    "hot dogColor": "hsl(4, 70%, 50%)",
                    "burger": 54,
                    "burgerColor": "hsl(13, 70%, 50%)",
                    "sandwich": 168,
                    "sandwichColor": "hsl(69, 70%, 50%)",
                    "kebab": 60,
                    "kebabColor": "hsl(128, 70%, 50%)",
                    "fries": 17,
                    "friesColor": "hsl(282, 70%, 50%)",
                    "donut": 94,
                    "donutColor": "hsl(48, 70%, 50%)"
                }
            ]
            }
            theme={
                {
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100]
                            }
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100]
                            }
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1
                            },
                            text: {
                                fill: colors.grey[100]
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                }
            }
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: "content",
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
    )
}
