import React from 'react'
import {
    G2,
    Chart,
    Tooltip,
    Interval,
} from "bizcharts";
import classes from "./FoodChart.module.css"

function FoodChart(props) {
    return (
        <div className={classes.containerChart}>
            <Chart height={400} width={700} padding="auto" data={props.data} autoFit>
                <Interval
                    adjust={[
                        {
                            type: 'dodge',
                            marginRatio: 0,
                        },
                    ]}
                    color={['mode', ['#FF5F5F', '#A0B4FF']]}                    
                    position="type*value"
                />
                <Tooltip shared />
            </Chart>
        </div>
    )
}

export default FoodChart
