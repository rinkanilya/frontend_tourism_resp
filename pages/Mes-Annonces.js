import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SousNavbar from "../components/SousNavbar/SousNavbar";
import styles from "../styles/MesAnnonces.module.css";
import Trash from "../assets/Trash.png";
import PenGris from "../assets/PenGris.png";
import Image from "next/image";
import { AnnoncesData } from "./api/AnnoncesData";
import PlusIcon from "../assets/Plus.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MesAnnonces = () => {
  const [open , setOpen] = React.useState(false);
  const [AllData, setAlldata] = useState(AnnoncesData);
  const [title , setTitle] = React.useState("")
  const [desc , setDesc] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddAnnonce = () => {
      setOpen(true)
      const Data = { title, desc, id: Math.floor(Math.random() * 1005) };
      AllData.push(Data);
      setOpen(false)
  }
  const DeleteEvent = (id) => {
    setAlldata(AllData.filter((x) => x.id != id))
  };
  return (
    <>
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
                <h1>{annonce.title}</h1>
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
                    DeleteEvent(annonce.id);
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
              <div className={styles.Desc}>{annonce.desc}</div>
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
    </>
  );
};

export default MesAnnonces;
