/**
*
**/
var RestControllerModule = (function () {

  var getOrders = function (callback) {
    axios.get('/orders/ordenes').then(function (response) {
        var ordersMap = Object.entries(response['data']);
        callback.onSuccess(ordersMap);
    }).catch(function (error) {
        callback.onFailed(error);
    });
  };

  var updateOrder = function (idmesa,orden, callback) {
    console.log(orden);
    axios({
        method: 'put',
        url: '/orders/'+idmesa,
        data: orden
    });
  };
  
  var getOrderByID = function (order,callback){
      
      axios.get('/orders/'+order).then(function (response) {
        console.log(response['data']);
        callback.onSuccess(response['data']);
    }).catch(function (error) {
        callback.onFailed(error);
    });
  };

  var deleteOrder = function (idmesa,orden,callback) {
    // todo implement
    console.log("idmesa: " + idmesa +" orden: " + orden[0]);
    
    axios({
        method: 'delete',
        url: '/orders/'+idmesa,
        data: orden
    });
   
  };

  var createOrder = function (id,order, callback) {
    // todo implement
    console.log(order);
    axios({
        method: 'post',
        url: '/orders/2',
        data: order
        
    });
  };

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    getOrderByID: getOrderByID,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();