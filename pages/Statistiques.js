import React, { useEffect, useState }  from 'react'
import Navbar from '../components/Navbar'
import SousNavbar from '../components/SousNavbar'
import styles from "../styles/Statistiques.module.css";
import {Pie , Line} from "react-chartjs-2";
import {Tooltip ,Title , ArcElement , Legend, Chart , CategoryScale , LineElement , PointElement , LinearScale   } from 'chart.js';
import { useRouter } from "next/router";
import axios from 'axios';


const Statistiques = () => {
  const [visits,setVisits]=useState(0)
  const router=useRouter();
  let logged;
  if (typeof window !== 'undefined') {
    logged=localStorage.getItem('logged')
  }
  // if(!logged){
  //   return(
  //     <div>
  //       <span onClick={()=>router.push('/signin')}>Log in</span>
  //     </div>
  //   )
      
  // }
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
  let lieuId;
  if (typeof window !== 'undefined') {
    lieuId= localStorage.getItem("lieuId")
  }
  const getVisiteur= async()=>{
    const {data}= await axios.get(`${process.env.URI}visite/lieu/${lieuId}`)
    setVisits(data.data)
  }
  useEffect(()=>{
    getVisiteur()
  },[])
  useEffect(()=>{

  },[visits])
  return (
    <>
       <div>
       <Navbar/>
        <SousNavbar/>
        <div className={styles.Container}>
            <div className={styles.Visiteur}>
                    <h1>{visits}</h1>
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
       </div>
    </>
  )
}

export default Statistiques