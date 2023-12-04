import React from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import './Responsive.css'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



const MainChart = () => {
    const user = useSelector((state) => state.getAllUserReducer)
    const project = useSelector((state) => state.getAllProjectReducer)
    const task = useSelector((state) => state.getTaskReducer)
    const data = {


        labels: ['Total User', 'Total Project', 'Total Task'],
        datasets: [
            {
                label: '# of Votes',
                data: [user.length, project.length, task.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <PolarArea data={data} />

}
export default MainChart