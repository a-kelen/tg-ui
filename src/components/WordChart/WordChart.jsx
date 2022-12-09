import { Chart } from "react-charts";
import * as React from 'react';

export function WordChart({data}) {
    const primaryAxis = React.useMemo(() => ({
        getValue: (datum) => datum.primary,
    }), []);

    const secondaryAxes = React.useMemo(() => [
        {
            getValue: (datum) => datum.secondary,
        },
    ], []);

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    )
}