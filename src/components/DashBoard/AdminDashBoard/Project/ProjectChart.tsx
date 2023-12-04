
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);
const ProjectChart = () => {

    const processProject = useSelector((state) => state.getProceesingProjectReducer)
    const zero = useSelector((state) => state.getPriorityZeroReducer)
    const one = useSelector((state) => state.getPriorityOneReducer)
    const two = useSelector((state) => state.getPriorityTwoReducer)
    const seven = useSelector((state) => state.getProjectSevenReducer)
    const data = {
        labels: ['processing project', 'zero priority', 'one priority', 'two priority', 'Task will be release in the next 7 days'],
        datasets: [
            {
                label: '# of Votes',
                data: [processProject.length, zero.length, one.length, two.length, seven.length],
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
export default ProjectChart