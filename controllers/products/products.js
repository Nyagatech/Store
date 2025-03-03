 
 
const getProducts = (req, res) => {
    res.send('This is all the products');
};

 
const getProductById = (req, res) => {
    res.send(`This is product with id ${req.params.id}`);
};

export default {
    getProducts,
    getProductById
};
