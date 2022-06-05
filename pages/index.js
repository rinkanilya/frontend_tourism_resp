import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import SousNavbar from "../components/SousNavbar/SousNavbar";
import styles from "../styles/Home.module.css";
import PenIcon from "../assets/Pen.png";
import PlusIcon from "../assets/Plus.png";
import Trash from "../assets/Trash.png";
import PenGris from "../assets/PenGris.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { EventData } from "./api/EventData";
import TextareaAutosize from "@mui/material/TextareaAutosize";


export default function Home() {
  const [open, setOpen] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const [Title, setTitle] = useState("Intitulé de l'evenment");
  const [Date, setDate] = useState("");
  const [editedDesc , setEditedDesc] = useState('')
  const [desc , setDesc] = useState("Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana Descriptif nanani nanana")
  const [AllData, setAlldata] = useState(EventData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddEvent = () => {
    const Data = { Title, Date, id: Math.floor(Math.random() * 1005) };
    AllData.push(Data);
    setOpen(false);
  };
  const DeleteEvent = (id) => {
    setAlldata(AllData.filter((x) => x.id != id))
  };
 const handleClickDescOpen = () => {
    setOpenDesc(true)
  }
  const EditDesc = () => {
    setOpenDesc(false)
    setDesc(editedDesc)
  }
  console.log();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <SousNavbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Descriptif</h3>
          <span onClick={handleClickDescOpen}>
            {" "}
            <Image
              src={PenIcon}
              alt="Pen"
              width={"22px"}
              height={"22px"}
            />{" "}
          </span>
        </div>
        <p>
          {desc}
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Evénement</h3>
          <span onClick={handleClickOpen}>
            {" "}
            <Image
              src={PlusIcon}
              alt="Plus"
              width={"12px"}
              height={"12px"}
            />{" "}
          </span>
        </div>
      </div>
      <div className={styles.EventContainer}>
        {AllData.slice(0)
          .reverse()
          .map((event, index) => (
            <div key={index} className={styles.Event}>
              <div className={styles.EventTitle}>
                <span>{event.Title}</span>
                <span>{event.Date}</span>
              </div>
              <div className={styles.Btn}>
                <span>
                  {" "}
                  <Image
                    src={PenGris}
                    alt="Plus"
                    width={"25px"}
                    height={"29px"}
                    style={{ marginTop: "1px" }}
                  />{" "}
                </span>
                <span
                  onClick={() => {
                    DeleteEvent(event.id);
                  }}
                >
                  {" "}
                  <Image
                    src={Trash}
                    alt="Plus"
                    width={"17px"}
                    height={"25px"}
                  />{" "}
                </span>
              </div>
            </div>
          ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter</DialogTitle>
        <DialogContent>
          <DialogContentText>Ajouter un evenement</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Titre de l'evenement"
            type="text"
            fullWidth
            variant="standard"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            sx={{ width: 200 }}
            value={Date}
            margin="normal"
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={AddEvent}>Ajouter</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDesc} onClose={handleClose}>
        <DialogTitle>Editer</DialogTitle>
        <DialogContent>
          <DialogContentText>Editer la description</DialogContentText>
          <TextareaAutosize
            autoFocus
            margin="dense"
            label="Descriptif ...."
            type="text"
            style={{fontFamily:"Manrope" , width:"450px" , height:"100px"}}
            fullWidth
            variant="standard"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDesc(false)}>Annuler</Button>
          <Button onClick={EditDesc}>Editer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}