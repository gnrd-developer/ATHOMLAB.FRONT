import {
  Grid,
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginStyles from "./login.module.css";
import { submitLogin } from "../../services/auth";
import { getAllCategories } from '../../services/category'//, getBestProducts
import Footer from '../client/components/Footer'

function Login() {

  
  const [categoryList, setCategoryList] = useState([]) //Aquí tengo mi variable y mi función.

  useEffect(() => {
    getAllCategories({ setCategoryList })
    //getBestProducts({ setBestProductList })
  },[])


  
  var navigate = useNavigate();

  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [wrongCredentials, setWrongCredentials] = useState({
    wrongData: false,
    infoText: "",
  });
  const [open, setOpen] = useState(false);

  


  
  const handleForm = (e) => {
    const tempData = { ...loginData };
    tempData[e.target.id] = e.target.value;
    setLoginData(tempData);
  };

  

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  

  window.addEventListener("scroll", function () {
    const value = window.scrollY;
    const stars = document.getElementById("stars");
    const moon = document.getElementById("moon");
    stars.style.left = value * 0.25 + "px";
    moon.style.top = value * 1.05 + "px";
  });

  return (
    <div className={loginStyles.container}>
      
      <section className={loginStyles.section}>

        <div>
          <img
            src={require("../client/images/stars.png")}
            id="stars"
            alt=""
            className={loginStyles.image}
          />
          <img
            src={require("../client/images/moon.png")}
            id="moon"
            alt=""
            style={{ mixBlendMode: "screen" }}
            className={loginStyles.image}
          />
          <img
            src={require("../client/images/mountains_behind.png")}
            alt=""
            className={loginStyles.image}
          />
          {/*<h2 className={loginStyles.text} id='text'>AthomLab Start</h2>*/}

          <img
            src={require("../client/images/mountains_front.png")}
            alt=""
            style={{ zIndex: "10", transform: "translateY(10px)" }}
            className={loginStyles.image}
          />

        </div>

      </section>
      
      <div className={loginStyles.sec}>{/*este es el div del quienes somos -- container-fluid*/}
        
        <h1 className="text-center text-sm mx-auto text-white">Nuestros Productos</h1>
        <div className="d-flex justify-content-center align-items-center" >
          <h2 className="text-center text-white">Haz clic en los productos que se encuentran abajo</h2>
        </div>

        <Grid className={loginStyles.cajaC}>
          {categoryList.map(categoryItem => (

            <Grid className={loginStyles.caja} key={categoryItem.id}>
              <div className={loginStyles.header}>
              <h4 className={loginStyles.neon}>{categoryItem.name}</h4>
              <h4 className={loginStyles.neon}>{categoryItem.name}</h4>
              </div>
              <div className={loginStyles.cuerpo}>
                <a href={'https://frontathomlab-production.up.railway.app/store/subcategory/' 
                + categoryItem.name}>{/*http://localhost:3000, https://frontathomlab-production.up.railway.app/store/subcategory/*/}
                  <img src={categoryItem.image} alt=""/>
                </a>
              </div>
            </Grid>

          ))}
        </Grid>


        <Stack
            spacing={1}
            className={loginStyles.card}
            justifyContent="center"
            alignItems="center"
          >

            <Typography variant="h4" component="h2" fontWeight={600}>
              Login
            </Typography>

            <img
              src={require("../client/images/logo.png")}
              alt="logo"
              height={100}
            />

            <TextField
              id="userName"
              label="Usuario"
              variant="outlined"
              onChange={(e) => handleForm(e)}
              value={loginData.userName}
            />

            <TextField
              type="password"
              id="password"
              label="Contraseña"
              variant="outlined"
              onChange={(e) => handleForm(e)}
              value={loginData.password}
            />

            <Button
              variant="contained"
              className="btn"
              onClick={() => {
                submitLogin({
                  loginData,
                  setWrongCredentials,
                  navigate,
                  setOpen,
                });
              }}
            >
              Iniciar Sesión
            </Button>

            <Button variant="text" color="success" href="/register">
              Crear cuenta
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {wrongCredentials.infoText}
              </Alert>

            </Snackbar>

        </Stack>

        <Footer/>   

      </div>{/*este es el div del quienes somos*/}
      
    </div>
  );
}

export default Login;
