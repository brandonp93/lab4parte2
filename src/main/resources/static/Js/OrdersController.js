/**
*
**/

var OrdersControllerModule = (function () {

    var showOrdersByTable = function () {
        var callback = {
            onSuccess: function(ordersMap){
                
                for(var w in ordersMap){
                    
                    var orderJSON = {order_id:ordersMap[w][0],table_id:ordersMap[w][1].tableNumber};
                
                    for (var produc in ordersMap[w][1].orderAmountsMap){
                        //console.log(ordersMap[w][1].orderAmountsMap);
                        
                    }
                }
                allOrders(ordersMap);
                console.log(orderJSON);
            },  
            onFailed: function(error){
                console.log(error);
            }
        };
        RestControllerModule.getOrders(callback);
    };
    
   
    var updateOrder = function () {
      // todo implement

    };

    var getOrderByID = function(){
        var callback = {
          onSuccess: function(order){
                  var orderJSON = {order_id:order[0][0],table_id:order[0][1].tableNumber};
                  console.log(orderJSON);
              },  
              onFailed: function(error){
                  console.log(error);
              }

      };
       RestControllerModule.getOrderByID(callback);
    };

    var deleteOrderItem = function (itemName) {
      // todo implement
    };

    var addItemToOrder = function (orderId, item) {
      // todo implement
    };

    return {
      showOrdersByTable: showOrdersByTable,
      updateOrder: updateOrder,
      getOrderByID: getOrderByID,
      deleteOrderItem: deleteOrderItem,
      addItemToOrder: addItemToOrder
    };

})();

function allOrders(ordenes){
    for(var w in ordenes){
        //console.log(ordenes[w]);
        ordenes[w].order_id = ordenes[w][0];
        ordenes[w].table_id = ordenes[w][1].tableNumber;
        delete ordenes[w][1].tableNumber;
        ordenes[w].products = [ordenes[w][1].orderAmountsMap];
        delete ordenes[w][1].orderAmountsMap;  
        for(var k in ordenes[w].products){
           for(var g in ordenes[w].products[k]){
               ordenes[w].products.push({"product": g , "quantity":ordenes[w].products[k][g]});
           }    
        }   
        ordenes[w].products.splice(0,1);
        var x = {};
        x.order_id = ordenes[w].order_id;
        x.table_id = ordenes[w].table_id;
        x.products = ordenes[w].products;
        insertTableOrder(x);
    } 
}

function setTableHeader(rowHeader){
	var pr = document.createElement("th");
	pr.innerHTML = "Product";
	rowHeader.appendChild(pr);
	var qa = document.createElement("th");
	rowHeader.appendChild(qa);
	qa.innerHTML = "Quantity";
	var pc = document.createElement("th");
	pc.innerHTML = "Total";
	rowHeader.appendChild(pc);
}

function insertTableOrder(orderInsert){
	//get the parent content of the tables representation of the orders
	var content = document.getElementById("OrdersDiv");
	//create a tag to identify which order is presented
	var inf = document.createElement("caption");
	inf.innerHTML="ORDER "+ String(orderInsert.order_id);
	//create a DOM table
	var t = document.createElement("table");
	t.appendChild(inf);
	t.setAttribute("id",orderInsert.table_id);
	t.setAttribute("class", "table");
	content.appendChild(t);	
	var th = document.createElement("thead");
	th.setAttribute("class","thead-light");
	var tr = document.createElement("tr");
	setTableHeader(tr);
	th.appendChild(tr);
	t.appendChild(th);
	//get the products of the current order
	var productInsert = orderInsert.products;
	//insert all products of the order registring all of the objects in productInsert
	for (i = 0; i < productInsert.length; i++){
		var rp = t.insertRow(t.rows.length);
		rp.insertCell(0).appendChild(document.createTextNode(productInsert[i].product));
		rp.insertCell(1).appendChild(document.createTextNode(productInsert[i].quantity));
	}	
	//create the button to delete the order
	var db = document.createElement("p");
	db.setAttribute("class", "lead");
	var rtl = t.insertRow(t.rows.length);
        rtl.insertCell(0).appendChild(db);
        rtl.insertCell(1);
        rtl.insertCell(2).setAttribute("id",orderInsert.order_id+"total");
        //getTotal(orderInsert.order_id);
	var b = document.createElement("a");
	b.setAttribute("class","btn btn-lg");
	b.innerHTML = "Remove this Order";
	b.setAttribute("onclick","removeOrderById("+String(orderInsert.table_id)+")");
	db.appendChild(b);
	
}

