import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import cx from 'classnames';
import styles from '../styles/Signin.module.css'
import axios from 'axios';
import { useRouter } from "next/router";
import { Alert, AlertTitle } from '@mui/material';


const signin = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${process.env.URI}responsable/login`, { email, password })
    
    console.log(data)
    if (data.status == 200) {
      localStorage.setItem("logged", true);
      localStorage.setItem("responsable", data.data.id);
      localStorage.setItem("lieuId", data.data.lieuId);
      router.push("/")
    } else {
      setError(true)
    }
  }
  return (
    <>

      <main className={cx(styles["form-signin"], "text-center", "mt-5")}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {error == true ? <Alert severity='error'> <AlertTitle>Error</AlertTitle>{data.message}</Alert> : <div></div>}
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>

      </main>

    </>
  )
}

export default signin