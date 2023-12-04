import Task from "./Task"


const Home = () => {





    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kenia&display=swap');
            </style>
            <div style={{ color: 'rgba(185, 47, 111, 0.8)', display: 'flex', justifyContent: 'center', fontSize: '100px', fontFamily: 'Kenia, sans-serif' }}>
                <h1>Employees Task</h1>
            </div>

            <Task />


        </>
    )
}
export default Home