import React from 'react'
import styles from "../styles/SousNavbar.module.css";
import Rating from '@mui/material/Rating';
import { useRouter } from "next/router";


import { AnnoncesData } from '../pages/api/AnnoncesData';

const SousNavbar = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [title , setTitle] = React.useState("Nom du Site")
  const [titreAnnonce , setTitreAnnonce] = React.useState("")
  const [descAnnonce , setDescAnnonce] = React.useState("");
  const [AllData , setAllData] = React.useState(AnnoncesData)

  if (typeof window !== 'undefined') {
    const placeName= localStorage.getItem("placeName")
    React.useEffect(()=>{
      setTitle(placeName)
    },[])
  }
  
  return (
    <>
      {router.pathname == "/" && (
        <div className={styles.container}>
            <h1> {title} </h1>
            <div className={styles.Button}>
                <span>Note</span>
                <Rating  name="read-only" value={value}  onChange={(event, newValue) => {
          setValue(newValue);
        }} />
            </div>
        </div>
      )}

      {router.pathname == "/Mon-Contenu" && (
        <div className={styles.container}>
        <h1>{title}</h1>
    </div>
      )}
      {router.pathname == "/Statistiques" && (
        <div className={styles.container}>
        <h1>Statistiques</h1>
    </div>
      )}



    </>
  )
}

export default SousNavbar