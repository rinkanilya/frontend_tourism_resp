import React from "react";
import Navbar from "../components/Navbar/Navbar";
import SousNavbar from "../components/SousNavbar/SousNavbar";
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

const MonContenu = () => {
  console.log(musée.src);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(musée.src);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const RemoveImage = () => {
    const Card = document.getElementById("Card");
    Card.remove();
    setOpen(false);
  };
  const handelImage = (e) => {
    const ff = e.target.files[0]
    const filePreview = URL.createObjectURL(ff)
    setImage(filePreview)
  }
  return (
    <>
      <Navbar />
      <SousNavbar />
      <div className={styles.Container}>
        <div id="Card" className={styles.Card}>
          <label htmlFor="filePicker"  className={styles.Title}>
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
            style={{visibility:"hidden" , position:"absolute"}}
            type={"file"}
          />
          <div
            className={styles.Image}
          >
            <img src={image} alt="musée" />
            <span onClick={handleClickOpen}>
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
    </>
  );
};

export default MonContenu;
