import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

    const [data, setData] = useState([]);

    const getData = () => {

        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

        let data = genres.map((genre) => {
            const value = events.filter((event) =>
                event.summary.split(' ').includes(genre)).length;
            return {
                name: genre,
                value: value
            };
        });
        return data;
    };

    useEffect(() => {
        setData(() => getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events]);


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#2F5373"
                fontSize="13px"
                letterSpacing={-0.35}
                fontWeight="600"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central">
                {`${name}  ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <ResponsiveContainer className="responsiveContainerPie" height={180} >
            <PieChart height={180} >
                <Pie
                    className="pie"
                    data={data.filter(data => (data.value >= 1))}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={15}
                    outerRadius={"65%"}
                    fill="antiquewhite"  // "#2F5373"
                    stroke="#9fbdd7"
                    dataKey="value"
                    isAnimationActive={false}
                >
                </Pie>
            </PieChart>
        </ResponsiveContainer>



    );
};


export default EventGenre;