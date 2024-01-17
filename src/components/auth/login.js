import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Grid
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

          <br />

          <Stack
            spacing={2}
            className={loginStyles.card}
            justifyContent="center"
            alignItems="center"
          >

            <Typography variant="h4" component="h2" fontWeight={600}>
              Registrese
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

          <img
            src={require("../client/images/mountains_front.png")}
            alt=""
            style={{ zIndex: "10", transform: "translateY(60px)" }}
            className={loginStyles.image}
          />

        </div>

      </section>
      
      <div className={loginStyles.sec}>{/*este es el div del quienes somos -- container-fluid*/}
        <h2 className={loginStyles.somos}>Quienes somos?</h2>
        <p className={loginStyles.quienes}>
          Somos una empresa joven, fundada por profesionales entusiastas
          y con experiencia en el mercado de equipos y accesorios en investigacion y equipamiento.
          Buscamos  siempre los mejores productos hasta lograr la satisfacción total de nuestros clientes.
          Trabajamos con productos y servicios 100% confiables
          , buscando continuamente para nuestros clientes mejorar sus procesos
          de trabajo y el desarrollo de su recurso humano
          a través de una relación ética y transparente con el mercado.
          Nos esforzamos continuamente para encontrar los productos
          mas adecuados para el éxito de su proyecto con precios competitivos.
        </p>

        <h1 className="text-center text-sm mx-auto text-white">Nuestros Productos</h1>
        <div className="d-flex justify-content-center align-items-center" >
          <h2 className="text-center text-white">Haz clic en los productos que se encuentran abajo</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <p className="text-center text-white pre text-wrap">
            Al hacer clic en cada categoría, podrás navegar por las subcategorías que se encuentran en cada una de ellas. 
            <br/>
            Cada subcategoría contiene productos que puedes comprar. 
            <br/>
            Para realizar la compra, sigue las siguientes instrucciones:
            <br/><br/>
            *Añade los productos que buscas a tu carrito de compras.
            <br/>
            *Crea un usuario en la aplicación e inicia sesión con él.
            <br/>
            *Un asistente de la empresa se comunicará contigo para conversar sobre tus dudas,
            la dirección de despacho, el monto y el método de pago.
            <br/>
            *También puedes comunicarte con nosotros a través del icono de WhatsApp. 
          </p>
        </div>

        <Grid className={loginStyles.cajaC}>
          {categoryList.map(categoryItem => (

            <Grid className={loginStyles.caja} key={categoryItem.id}>
              <div className={loginStyles.header}>
              <h4 className={loginStyles.neon}>{categoryItem.name}</h4>
              <h4 className={loginStyles.neon}>{categoryItem.name}</h4>
              </div>
              <div className={loginStyles.cuerpo}>
                <a href={'https://frontathomlab-production.up.railway.app/store/subcategory/' + categoryItem.name}>{/*http://localhost:3000, https://frontathomlab-production.up.railway.app/store/subcategory/*/}
                  <img src={categoryItem.image} alt=""/>
                </a>
              </div>
            </Grid>

          ))}
        </Grid>


        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>        
        
        <h2 className="text-center text-sm mx-auto text-white">¿Como funciona la App?</h2>
        <h2 className="text-center text-sm mx-auto text-white">
          Haz clic en las imágenes.
        </h2>
              

        <div>
          <div className="row align-items-center">
            <div className="col-sm-6">


              <div className={loginStyles.muck}>
                <div className={loginStyles.circle}>
                  <img alt="muck1" src={require("../client/images/dos.png")} className={loginStyles.logo1}/>
                </div>
                <div className={loginStyles.content}>
                  <h3 className={loginStyles.color}>Navega</h3>
                  <p className="w-100 text-purple">
                    Clic en el producto que buscas para ver a detalle su imagen, descripción y pdf adjunto.
                  </p>
                </div>
                <img src={require("../client/images/muckup05.png")} className={loginStyles.product} alt="product"></img>
              </div>

            </div>
            
            <div className="col-sm-6">


              <div className={loginStyles.muck}>
                <div className={loginStyles.circle}>
                  <img alt="muck1" src={require("../client/images/tres.png")} className={loginStyles.logo1}/>
                </div>
                <div className={loginStyles.content}>
                  <h3>Encuentra</h3>
                  <p className="w-100 text-purple">
                    Encuentra lo que andas buscando haciendo clic en cada producto.
                    Podras ver su pdf adjunto y leer su descripción detallada.
                  </p>
                </div>
                <img src={require("../client/images/muckup02.png")} className={loginStyles.product} alt="product"></img>
              </div>
              
            </div>

          </div>

          <div className="row">
            <div className="col-sm-6">

              <div className={loginStyles.muck}>
                  <div className={loginStyles.circle}>
                    <img alt="muck1" src={require("../client/images/uno.png")} className={loginStyles.logo1}/>
                  </div>
                  <div className={loginStyles.content}>
                    <h3>Unete</h3>
                    <p className="w-100 text-purple">
                      Clic en el boton crear cuenta si aun no lo has hecho.
                      Ingresa con tus credenciales después.
                      Verás la página principal donde está todo.                
                    </p>
                  </div>
                  <img src={require("../client/images/muckup01.png")} className={loginStyles.product} alt="product"></img>
              </div>

            </div>

            <div className="col-sm-6">


              <div className={loginStyles.muck}>
                <div className={loginStyles.circle}>
                  <img alt="muck1" src={require("../client/images/cuatro.png")} className={loginStyles.logo1}/>
                </div>
                <div className={loginStyles.content}>
                  <h3 className={loginStyles.color}>Selecciona</h3>
                  <p className="w-100 text-purple">
                    vuelve al producto que encontraste y añadelo al carrito de compras.
                    Busca mas productos si así lo deseas.
                  </p>
                </div>
                <img src={require("../client/images/muckup03.png")} className={loginStyles.product} alt="product"></img>
              </div>
              
            </div>

            <div className="col-sm-6">

              <div className={loginStyles.muck}>
                  <div className={loginStyles.circle}>
                    <img alt="muck1" src={require("../client/images/cinco.png")} className={loginStyles.logo1}/>
                  </div>
                  <div className={loginStyles.content}>
                    <h3 className={loginStyles.color}>Confirma</h3>
                    <div className="d-flex align-items-center justify-content-center h-100">
                    <p className="w-100 text-purple">
                      Al hacer clic en Confirmar Orden De compra
                      se enviará el pedido a nuestro centro de atención al cliente.
                      un agente hablara con tigo a la brevedad por correo electronico
                      para decidir el medio de pago o resolver cualquier duda que tengas.
                      Tambien puedes conversar con nosotros por WhatsApp haciendo clic en
                      el icono del mismo.
                    </p>
                    </div>
                  </div>
                  <img src={require("../client/images/s.png")} className={loginStyles.product} alt="product"></img>
              </div>
            </div>

          </div>     
        </div>

      <Footer />        

      </div>{/*este es el div del quienes somos*/}
      
    </div>
  );
}

export default Login;
