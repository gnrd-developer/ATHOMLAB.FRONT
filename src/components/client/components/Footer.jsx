import React from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ModalFooter } from "react-bootstrap";
import { IconButton, Badge} from '@mui/material';

const Footer = () => {
  return (    
    <ModalFooter className="container text-center text-lg-start bg-black text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span className="text-white">Get connected with us:</span>
        </div>
      </section>

      <section>


        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                <i className="fas fa-gem me-3"></i>Dato Importante
              </h6>
              <p className="text-white">
                Creamos esta aplicación para que los clientes
                de Expansiva Eirl gestionen sus pedidos.
                Y así poder agilizar sus ordenes de compra de forma simple.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                Descubre mas aquí ó Conversa con un asistente.
              </h6>

              <IconButton target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100068138528772">
                <FacebookIcon height={28} color="primary"/>
              </IconButton>

              <IconButton target="_blank" rel="noopener noreferrer" href="https://wa.me/51933504373/?text=Hola,%20Muy%20buenas%20tardes.%20Le%20hablo%20para%20hacerle%20algunas%20consultas" size="large">
                <Badge>
                  <WhatsAppIcon color="primary" height={25}/>
                </Badge>
              </IconButton>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">ESCRÍBENOS</h6>
              <p className="text-white">
                <i className="fas fa-envelope me-3"></i>
                gnrd.developer@gmail.com
              </p>
              <p className="text-white"><i className="fas fa-phone me-3"></i> + 51933504373</p>
              <p className="text-white"><i className="fas fa-print me-3"></i> + 56954606577</p>
            </div>
          </div>
        </div>


      </section>
      <div className="text-center p-4 text-white">
        © Todos los derechos reservados Copyright: <a className="text-reset fw-bold" href="https://athomlab.pe/">  wwww.athomlab.pe</a>
      </div>
    </ModalFooter>
  );
};

export default Footer;