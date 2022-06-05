import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import SousNavbar from '../components/SousNavbar/SousNavbar'
import styles from "../styles/Statistiques.module.css";
import {Pie , Line} from "react-chartjs-2";
import {Tooltip ,Title , ArcElement , Legend, Chart , CategoryScale , LineElement , PointElement , LinearScale   } from 'chart.js';




const Statistiques = () => {
  Chart.register(
    Tooltip ,Title , ArcElement , Legend ,CategoryScale , LineElement , PointElement , LinearScale
  );
  const data = {
    labels: [
      "Tranche d'age 1",
      "Tranche d'age 1",
      "Tranche d'age 1",
      "Tranche d'age 1",
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100 , 20],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        '#D25F9C',
      ],
      borderColor: "#ffff",
      hoverOffset: 4
    }]
  };
  return (
    <>
        <Navbar/>
        <SousNavbar/>
        <div className={styles.Container}>
            <div className={styles.Visiteur}>
                    <h1>529</h1>
                    <h3>Visiteurs</h3>
            </div>
            <div className={styles.ChartOne}>
                <Pie data={data} style={{width:"80vh" , height:"40vh" , position:"relative"}}
  options={{ maintainAspectRatio: false , responsive: true, }}/>
            </div>
            <div className={styles.ChartTwo}>
            <Line data={data} style={{width:"80vh" , height:"40vh" , position:"relative"}}
  options={{ maintainAspectRatio: false , responsive: true, }} />
            </div>
        </div>
    </>
  )
}

export default Statistiques