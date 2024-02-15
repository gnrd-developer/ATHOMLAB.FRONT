  import React, { useEffect, useState } from "react";
  import {Grid} from "@mui/material"
  import subCategoryStyle from "./subCategory.module.css";
  import { useParams } from "react-router-dom";
  import { getSubCategoriesByCategoryName } from '../../../services/category'
  
  
  function SubCategory() {
    const [subCategoryList, setSubCategoryList] = useState([]);
    const {name} = useParams();
  
    useEffect(() => {
        getSubCategoriesByCategoryName(name.toString()).then(data => {
            setSubCategoryList(data);
        })
    }, [name]);
  
    return (
      <div>

          
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-4">
            <button className="btn btn-primary btn-lg" 
            onClick={() => window.history.back()}>
              Volver Atrás
            </button>
          </div>
        </div>
      </div>

      <br/>

      <div className={subCategoryStyle.container}>

      <Grid className={subCategoryStyle.cajaC}>
        {subCategoryList.map(subCategoryList =>


          <a href={'https://frontathomlab-production.up.railway.app/store/listado/' 
            + subCategoryList.name}
            className={subCategoryStyle.caja} key={subCategoryList.id}>
            {/*https://frontathomlab-production.up.railway.app/, 
            http://localhost:3000/*/}

            <div className={subCategoryStyle.header}>
              <h4 className={subCategoryStyle.neon}>{subCategoryList.name}</h4>
              <h4 className={subCategoryStyle.neon}>{subCategoryList.name}</h4>
            </div>
            
            <div className={subCategoryStyle.cuerpo}>
              <img src={subCategoryList.image} alt="img"/>
            </div>
            
          </a>)
        }
      </Grid>

      </div>

      </div>
    );
  }
  
  export default SubCategory;
  