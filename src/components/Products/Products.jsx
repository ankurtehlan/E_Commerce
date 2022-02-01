import React from 'react';
import Grid from '@material-ui/core/Grid'; 
import Product from './Product/Product';
import useStyles from './Styles';






function Products( {products,handleAddtoCart} ) {
  
const classes = useStyles();
  return ( 

  <main className={classes.content}>
    <div className={classes.toolbar}/>

      <Grid container justify='center' spacing={4}>

        {/* maping products from products */}
        { products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              {/* pass mapping products from Product Component */}
                    <Product product={product} handleAddtoCart={handleAddtoCart}/>
            </Grid>
        ))}

      </Grid>

  </main>
  )
}

export default Products;
