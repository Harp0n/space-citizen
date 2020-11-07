import React from 'react'
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Coordinate,
    Interaction
} from 'bizcharts';
import classes from "./FoodChart.module.css"

function FoodChart(props) {
    return (
        <div className={classes.containerChart}>
            <Chart height={250} data={props.data} scale={props.cols} autoFit>
                <Coordinate type="theta" radius={0.60} />
                <Tooltip showTitle={false} />
                <Axis visible={false} color='white' />
                <Interval
                    position="percent"
                    adjust="stack"
                    color={['type', ['#FF5F5F', '#A0B4FF', '#FDFF90', '#695959', '#D3D3D3']]}
                    style={{
                        lineWidth: 1,
                        stroke: 'transparent'
                    }}
                    label={['count', {
                        content: (data) => {
                            return `${data.type}: ${(data.percent * 100).toFixed(2)}%`;
                        },
                    }]}
                />
                <Interaction type='element-single-selected' />
            </Chart>
        </div>
    )
}

export default FoodChart
