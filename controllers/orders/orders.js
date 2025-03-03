const getOrders = (req, res) => {
    res.send('This is all orders');
};

 
const getOrderById = (req, res) => {
    res.send(`This is order with id ${req.params.id}`);
};

export default {
    getOrders,
    getOrderById
};
