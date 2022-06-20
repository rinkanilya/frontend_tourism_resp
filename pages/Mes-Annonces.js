import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/MesAnnonces.module.css";
import Trash from "../assets/Trash.png";
import PenGris from "../assets/PenGris.png";
import Image from "next/image";
import PlusIcon from "../assets/Plus.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import axios from 'axios';


const MesAnnonces = () => {
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
  const [open , setOpen] = React.useState(false);
  const [AllData, setAlldata] = useState([]);
  const [title , setTitle] = React.useState("")
  const [desc , setDesc] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let res;
  if (typeof window !== 'undefined') {
    res= localStorage.getItem("responsable")
  }
  const getAnnonce=async()=>{
    const {data}= await axios.get(`${process.env.URI}annonce/${res}`)
    setAlldata(data.data)
  }
  useEffect(()=>{
    if(res){
      getAnnonce()
    }
    
  },[])
  const AddAnnonce =async () => {
    setOpen(true)
    const date=new Date();
    const {data}= await axios.post(`${process.env.URI}annonce`,{date:date,content:desc,id:res})
    setAlldata([...AllData,data.data])
    alert(data.message)
    setOpen(false)
}
const DeleteEvent = async(id) => {
  const {data}= await axios.delete(`${process.env.URI}annonce/${id}`)
  setAlldata(AllData.filter((x) => x.idannonce != id))
  alert(data.message)
};
useEffect(()=>{},[AllData])
  return (
    <>
      <div>
      <Navbar />
      <div className={styles.container}>
        <h1>Annonces</h1>
        <div onClick={handleClickOpen} className={styles.ButtonAdd}>
            <div  className={styles.btn}>
              <Image src={PlusIcon} alt="Plus" width={"12px"} height={"12px"} />
              <span >Ajouter</span>
            </div>
        </div>
    </div>
      <div className={styles.Container}>
        {AllData.slice(0)
          .reverse()
          .map((annonce, index) => (
            <div key={index} className={styles.Card}>
              <div className={styles.Title}>
                <h1>{annonce.Addedat}</h1>
                <div className={styles.Btn}>
                  <span>
                    <Image
                      src={PenGris}
                      alt="Plus"
                      width={"28px"}
                      height={"30px"}
                    />
                  </span>
                  <span onClick={() => {
                    DeleteEvent(annonce.idannonce);
                  }}>
                    <Image
                      src={Trash}
                      alt="Plus"
                      width={"17px"}
                      height={"25px"}
                    />
                  </span>
                </div>
              </div>
              <div className={styles.Desc}>{annonce.contenue}</div>
            </div>
          ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter</DialogTitle>
        <DialogContent>
          <DialogContentText>Ajouter une annonce</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Titre de l'annonce"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            maxRows={4}
            margin="dense"
            label="Description de l'annonce"
            type="text"
            placeholder='Description de l’annonce ou texte de l’annonceDescription de l’annonce ou texte de l’annonc eDescription de l’annonce ou texte de l’annonceDescription'
            variant="standard"
            value={desc}
            style={{ width: 500 }}
            onChange={(e) => setDesc(e.target.value)}
          />
          <></>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={AddAnnonce}>Ajouter</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};

export default MesAnnonces;
