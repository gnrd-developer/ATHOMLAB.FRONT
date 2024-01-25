import React from 'react'
import cardStyle from './productCard.module.css'
function ProductCard(props) {
    const { product } = props
    return (
        <div className={cardStyle.container}>
            <a className={cardStyle.card} href={'http://localhost:3000/store/detail/' 
            + product.id + '/' + product.subCategory.name}>
                {/*http://localhost:3000/, https://frontathomlab-production.up.railway.app/*/}
                {/*<div className={cardStyle.img_container}>
                    <img src={'http://localhost:8080/product/uploads/'+ product.image} alt='logo' 
                    className={cardStyle.img}/>
                </div>*/}
                <div className={cardStyle.img_container}>
                    <img src={product.image} alt='logo' className={cardStyle.img}/>
                </div>
                <article className={cardStyle.description}>
                    <div className={cardStyle.p}>
                        {product.name}
                    </div>
                    <div className={cardStyle.p}>
                        {product.subCategory.name}
                    </div>
                </article>
            </a>
        </div>
    )
}

export default ProductCard

/*
esta la saque despues de la linea 17
<Typography mt={1} variant="p" fontSize={22} component="p" fontWeight={700}>
  ${product.price.toFixed(2)}
</Typography>
*/