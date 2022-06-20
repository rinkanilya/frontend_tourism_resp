import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SousNavbar from "../components/SousNavbar";
import styles from "../styles/MonContenu.module.css";
import DownloadIcon from "../assets/Download.png";
import Image from "next/image";
import Pen from "../assets/Pen.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import musée from "../assets/musée.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import { storage } from '../firebase'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'




const MonContenu = () => {

  const router = useRouter()
  let logged;
  if (typeof window !== 'undefined') {
    logged = localStorage.getItem('logged')
  }
  // if (!logged) {
  //   return (
  //     <div>
  //       <span onClick={() => router.push('/signin')}>Log in</span>
  //     </div>
  //   )

  // }
  let lieuId;
  if (typeof window !== 'undefined') {
    lieuId = localStorage.getItem("lieuId")
  }
  console.log(musée.src);
  const [open, setOpen] = React.useState(false);
  const [imageList, setImageList] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const RemoveImage = (ref) => {
     deleteObject(ref).then(() => {
        alert('deleted!')
     })
  };
  const handelImage = (e) => {
    if (e.target.files[0] == null) return;
    const imageRef = ref(storage, `images/${lieuId}/${Date.now() + e.target.files[0].name}`)
    uploadBytes(imageRef, e.target.files[0]).then((element) => {
      getDownloadURL(element.ref).then((url) => {
        alert("Uploaded!")
      })
    })
  }
  const listRef = ref(storage, `images/${lieuId}/`)
  useEffect(() => {
    listAll(listRef).then((res) => {
      setImageList([])
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { ref: item, url: url }])
        })
      })
    })
  }, [])
  return (
    <>
      <div>
      <Navbar />
      <SousNavbar />
      <div className={styles.Container}>
        <div id="Card" className={styles.Card}>
          <label htmlFor="filePicker" className={styles.Title}>
            <span>Photos</span>
            <Image
              src={DownloadIcon}
              alt="Download"
              height={"14px"}
              width={"14px"}
            />
          </label>
          <input
            id="filePicker"
            accept={'image/*'}
            onChange={handelImage}
            style={{ visibility: "hidden", position: "absolute" }}
            type={"file"}
          />
          {imageList.map((item) => {
            console.log(imageList)
            return (
              <>
                <div className={styles.Image}>
                  <img src={item.url} alt="musée" />
                  <span onClick={()=>{RemoveImage(item.ref)} }>
                    <DeleteOutlineIcon fontSize="small" />
                  </span>
                  <div className={styles.Points}>
                    <div style={{ backgroundColor: "#3F3B3B" }}></div>
                  </div>
                </div>
              </>)
          })
          }

        </div>
        <div className={styles.Card}>
          <div className={styles.Title}>
            <span>Vidéos</span>
            <Image
              src={DownloadIcon}
              alt="Download"
              height={"14px"}
              width={"14px"}
            />
          </div>
          <div
            style={{ background: `url(${musée.src})`, backgroundSize: "cover" }}
            className={styles.Image}
          >
            <span>
              <DeleteOutlineIcon fontSize="small" />
            </span>
            <div className={styles.Points}>
              <div style={{ backgroundColor: "#3F3B3B" }}></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.Card}>
          <div className={styles.Title}>
            <span>Historique</span>
            <Image src={Pen} alt="Download" height={"18px"} width={"18px"} />
          </div>
          <div className={styles.LastImage}></div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette image
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={RemoveImage}>Supprimer</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};

export default MonContenu;
