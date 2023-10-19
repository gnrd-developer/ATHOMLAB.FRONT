import {
  Alert,
  Button,
  Chip,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  Modal,
  Box
} from "@mui/material";
import React, { useEffect, useState } from "react";
import detailStyle from "./detail.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "./productCard";
import ClassIcon from "@mui/icons-material/Class";
import { useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../../../services/product";
import { getUserDetails } from "../../../services/auth";
import { addToCart } from "../../../services/shoppingCart";
import ProductForm from "./productForm";


function Detail() {
  const [amountToAdd, setAmount] = useState(1);
  const { id, category } = useParams();
  let [product, setProduct] = useState(null);
  let [editProduct, setEditProduct] = useState(null);
  const [openPDF, setOpenPDF] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [roles, setUserRole] = useState([]); //puede que este mala esta linea ya que deberia decir setRole y dice setUserRole
  const [showProductFeedback, setProductFeedback] = React.useState({
    show: false,
    status: false,
    infoText: "",
  }); //igual esta deberia decir setShowProductFeedback y dice setProductFeedback
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let shouldUpdate = true;
    getUserDetails({ setUserRole });

    if (shouldUpdate) {
      Promise.all([
        getProductById(id.toString()),
        getRelatedProducts({ category, id }), //puede que aqui haya un error
      ]).then((results) => {
        const [first, second] = results;
        setProduct(first);
        setEditProduct(first);
        setRelatedProducts(second);
      });
    }
  }, [id, category, refresh]);

  const add = () => {
    setAmount(amountToAdd + 1);
  };

  const subtract = () => {
    setAmount(amountToAdd - 1);
  };

  const addProduct = (productToAdd) => {
    
    addToCart({ amountToAdd, productToAdd, setProductFeedback});
  };

  const handleOpenModal = () => setOpenModal(true);

  const closeProductFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProductFeedback({ show: false });
  };

  return (
    <div className={detailStyle.container}>

      <div class="container">
        <div class="row">
          <div class="col-12 text-center my-4">
            <button class="btn btn-primary btn-lg" onClick={() => window.history.back()}>
              Volver Atrás
            </button>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid container spacing={9} pt={1}>
        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            alignItems="flex-start"
            className={detailStyle.stack}
            spacing={1}
          >
            {roles.length > 1 ? (
              <Button
                variant="text"
                color="primary"
                id="button"
                onClick={handleOpenModal}
              >
                Editar
              </Button>
            ) : null}

            <Typography
              variant="span"
              fontSize={40}
              component="h2"
              fontWeight={600}
            >
              {product && product.name}
            </Typography>

            <Typography
              variant="span"
              fontSize={16}
              textDecoration="none"
              component="p"
              fontWeight={200}
            >
              {product && product.description}
            </Typography>


            <div className={detailStyle.img_container}>
              <img
                src={
                  product
                    ? product.image
                    : "https://cdn-icons-png.flaticon.com/512/107/107814.png"
                }
                alt="product"
                className={detailStyle.img}
              />
            </div>


            {/*
            <div className={detailStyle.img_container}>
              <img
                src={
                  product
                    ? "http://localhost:8080/product/uploads/" + product.image
                    : "https://cdn-icons-png.flaticon.com/512/107/107814.png"
                }
                alt="product"
                className={detailStyle.img}
              />
            </div>
            */}

            <div className={detailStyle.info}>
              {/*los botones añadir compra, sumar y restar para la cantidad de productos a llevar*/}
              <div className={detailStyle.action}>
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={subtract}
                  disabled={amountToAdd === 1}
                >
                  <RemoveIcon />
                </IconButton>

                <span className={detailStyle.amount_input}>{amountToAdd}</span>

                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={add}
                >
                  <AddIcon />
                </IconButton>
                
              </div>{" "}
              {/* lo que contiene este div son los botones para agregar y quitar la cantidad de productos a llevar*/}

              <Button variant="contained" className="btn2" onClick={() => {setOpenPDF(true)}}>
                PDF
              </Button>


              <Modal
                open={openPDF}
                onClose={()=> {setOpenPDF(false)}}
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'fixed',
                  top: 30,
                  left: 0,
                  right: 0,
                  bottom: 30,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 9999,
                  overflowY: 'auto'
                }}
                className='container'
              >

                <Box>
                  <img  src={
                      product
                        ? product.pdf
                        : "https://cdn-icons-png.flaticon.com/512/107/107814.png"
                    }
                    alt="product"
                    className="container"
                  />
                </Box>


                {/*
                <Box>
                  <img  src={
                      product
                        ? "http://localhost:8080/product/uploads/" + product.pdf
                        : "https://cdn-icons-png.flaticon.com/512/107/107814.png"
                    }
                    alt="product"
                    className="container"
                  />
                </Box>
                */}
              </Modal>

              <br></br>

              <Button
                variant="contained"
                className="btn2"
                onClick={() => {
                  addProduct(product);
                }}
              >
                Añadir A Orden De Compra
              </Button>
            </div>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} className={detailStyle.related_grid}>
          <Chip
            icon={<ClassIcon />}
            label="Relacionados"
            className={detailStyle.chip}
          />
          <div className="container">
            {relatedProducts.map((related) => (
              <ProductCard product={related} key={related.id} />
            ))}
          </div>
        </Grid>

        
      </Grid>

      {showProductFeedback.show && (
        <Snackbar
          open={showProductFeedback.show}
          autoHideDuration={2000}
          onClose={closeProductFeedback}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={closeProductFeedback}
            severity={showProductFeedback.status ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {showProductFeedback.infoText}
          </Alert>
        </Snackbar>
      )}

      {product && (
        <ProductForm
          setRefresh={setRefresh}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setProductFeedback={setProductFeedback}
          edit={true}
          setProduct={setEditProduct}
          product={editProduct}
        />
      )}
    </div>
  );
}

export default Detail;

/*
parece que este trozo de codigo estaba mal hecho
<Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        {showProductFeedback.show && <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>}
      </Snackbar>
------------------
esta la saqué de la linea despues de la 90
<Typography variant="span" fontSize={30} component="h2" fontWeight={600}>
  ${product && product.price.toFixed(2)}
</Typography>
*/
