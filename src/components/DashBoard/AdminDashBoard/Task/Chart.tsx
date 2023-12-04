
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = () => {
    const overdue = useSelector((state) => state.getOverDueReducer)
    const pending = useSelector((state) => state.getPedingReducer)
    const complete = useSelector((state) => state.getCompleteReducer)
    const inprocess = useSelector((state) => state.getInprocessReducer)

    const taskEnd = useSelector((state) => state.getTaskEndReducer)
    const data = {
        labels: ['overdue task', 'pending task', 'In-processing task', 'complete task', 'Task will need to be completed in the next 3 days'],
        datasets: [
            {
                label: '# of Votes',
                data: [overdue.length, pending.length, inprocess.length, complete.length, taskEnd.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (<>
        < Doughnut data={data} />

    </>)
}
export default Chart