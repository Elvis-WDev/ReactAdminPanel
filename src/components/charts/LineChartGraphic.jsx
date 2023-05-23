import { useTheme } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line"
import { tokens } from "../../theme";


export const LineChartGraphic = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsiveLine
            data={[
                {
                    "id": "japan",
                    "color": "hsl(355, 70%, 50%)",
                    "data": [
                        {
                            "x": "plane",
                            "y": 175
                        },
                        {
                            "x": "helicopter",
                            "y": 256
                        },
                        {
                            "x": "boat",
                            "y": 80
                        },
                        {
                            "x": "train",
                            "y": 74
                        },
                        {
                            "x": "subway",
                            "y": 161
                        },
                        {
                            "x": "bus",
                            "y": 101
                        },
                        {
                            "x": "car",
                            "y": 68
                        },
                        {
                            "x": "moto",
                            "y": 140
                        },
                        {
                            "x": "bicycle",
                            "y": 170
                        },
                        {
                            "x": "horse",
                            "y": 183
                        },
                        {
                            "x": "skateboard",
                            "y": 196
                        },
                        {
                            "x": "others",
                            "y": 85
                        }
                    ]
                },
                {
                    "id": "france",
                    "color": "hsl(240, 70%, 50%)",
                    "data": [
                        {
                            "x": "plane",
                            "y": 287
                        },
                        {
                            "x": "helicopter",
                            "y": 102
                        },
                        {
                            "x": "boat",
                            "y": 216
                        },
                        {
                            "x": "train",
                            "y": 111
                        },
                        {
                            "x": "subway",
                            "y": 95
                        },
                        {
                            "x": "bus",
                            "y": 174
                        },
                        {
                            "x": "car",
                            "y": 21
                        },
                        {
                            "x": "moto",
                            "y": 276
                        },
                        {
                            "x": "bicycle",
                            "y": 179
                        },
                        {
                            "x": "horse",
                            "y": 177
                        },
                        {
                            "x": "skateboard",
                            "y": 254
                        },
                        {
                            "x": "others",
                            "y": 272
                        }
                    ]
                },
                {
                    "id": "us",
                    "color": "hsl(352, 70%, 50%)",
                    "data": [
                        {
                            "x": "plane",
                            "y": 182
                        },
                        {
                            "x": "helicopter",
                            "y": 159
                        },
                        {
                            "x": "boat",
                            "y": 182
                        },
                        {
                            "x": "train",
                            "y": 266
                        },
                        {
                            "x": "subway",
                            "y": 135
                        },
                        {
                            "x": "bus",
                            "y": 88
                        },
                        {
                            "x": "car",
                            "y": 264
                        },
                        {
                            "x": "moto",
                            "y": 29
                        },
                        {
                            "x": "bicycle",
                            "y": 205
                        },
                        {
                            "x": "horse",
                            "y": 20
                        },
                        {
                            "x": "skateboard",
                            "y": 293
                        },
                        {
                            "x": "others",
                            "y": 66
                        }
                    ]
                },
                {
                    "id": "germany",
                    "color": "hsl(229, 70%, 50%)",
                    "data": [
                        {
                            "x": "plane",
                            "y": 39
                        },
                        {
                            "x": "helicopter",
                            "y": 33
                        },
                        {
                            "x": "boat",
                            "y": 195
                        },
                        {
                            "x": "train",
                            "y": 45
                        },
                        {
                            "x": "subway",
                            "y": 197
                        },
                        {
                            "x": "bus",
                            "y": 234
                        },
                        {
                            "x": "car",
                            "y": 54
                        },
                        {
                            "x": "moto",
                            "y": 58
                        },
                        {
                            "x": "bicycle",
                            "y": 104
                        },
                        {
                            "x": "horse",
                            "y": 26
                        },
                        {
                            "x": "skateboard",
                            "y": 35
                        },
                        {
                            "x": "others",
                            "y": 196
                        }
                    ]
                },
                {
                    "id": "norway",
                    "color": "hsl(354, 70%, 50%)",
                    "data": [
                        {
                            "x": "plane",
                            "y": 39
                        },
                        {
                            "x": "helicopter",
                            "y": 269
                        },
                        {
                            "x": "boat",
                            "y": 1
                        },
                        {
                            "x": "train",
                            "y": 291
                        },
                        {
                            "x": "subway",
                            "y": 169
                        },
                        {
                            "x": "bus",
                            "y": 115
                        },
                        {
                            "x": "car",
                            "y": 284
                        },
                        {
                            "x": "moto",
                            "y": 149
                        },
                        {
                            "x": "bicycle",
                            "y": 44
                        },
                        {
                            "x": "horse",
                            "y": 40
                        },
                        {
                            "x": "skateboard",
                            "y": 228
                        },
                        {
                            "x": "others",
                            "y": 285
                        }
                    ]
                }
            ]}
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
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
