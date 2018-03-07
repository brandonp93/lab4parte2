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

  var updateOrder = function (order, callback) {
    // todo implement
  };
  
  var getOrderByID = function (order){
      
  }

  var deleteOrder = function (idmesa,callback) {
    // todo implement
    axios.delete('/orders/'+idmesa,data);
  };

  var createOrder = function (order, callback) {
    // todo implement
  };

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();