/**
*
**/
//create a list to contain all the formated orders in a standar
var ordersFormated = [];
var ordenes = [];
var OrdersControllerModule = (function () {

    var showOrdersByTable = function () {
        var callback = {
            onSuccess: function(ordersMap){
                for(var w in ordersMap){
                    var pdrs = [];
                    var orderJSON = {order_id:ordersMap[w][0],table_id:ordersMap[w][1].tableNumber,products:pdrs};
                    var pr = ordersMap[w][1].orderAmountsMap;
                    for (var produc in pr){
                        var po = {product:produc,quantity:pr[produc]};
                        pdrs.push(po);
                    }
                    ordersFormated.push(orderJSON);
                    insertTableOrder(orderJSON);
                }
            },  
            onFailed: function(error){
                console.log("Falla en el servicio "+error);
                alert("No se puede conectar en este momento con el chat, intentelo de nuevo mas tarde");
            }
        };
        RestControllerModule.getOrders(callback);
    };
    
    var getOrders = function(){
        var callback = {
             onSuccess: function(orders){
                  ordenes = orders;
                  console.log(ordenes);
                  createOption(ordenes);
                  
              },  
              onFailed: function(error){
                  console.log(error);
              }
        };
        RestControllerModule.getOrders(callback);
    };
   
    var updateOrder = function (idmesa,orden) {
      var callback = {
          onSuccess: function(order){
                  console.log(order);
                  var orderJSON = {order_id:order.orderAmountsMap,table_id:order.tableNumber};
                  
              },  
              onFailed: function(error){
                  console.log(error);
              }

      };
       RestControllerModule.updateOrder(idmesa,orden,callback);

    };

    var getOrderByID = function(idorden){
        var callback = {
          onSuccess: function(order){
                  console.log(order);
                  var orderJSON = {order_id:order.orderAmountsMap,table_id:order.tableNumber};
              },  
              onFailed: function(error){
                  console.log(error);
              }

      };
       RestControllerModule.getOrderByID(idorden,callback);
    };

    var deleteOrderItem = function (idmesa,orden) {
      var callback = {
          onSuccess: function(order){
                  console.log(order);
                  var orderJSON = {order_id:order.orderAmountsMap,table_id:order.tableNumber};
                  
              },  
              onFailed: function(error){
                  console.log(error);
              }

      };
      RestControllerModule.deleteOrder(idmesa,orden,callback);
    };

 
    var createOrder = function (id,orden){
        var callback = {
          onSuccess: function(order){
                  console.log(order);
                  var orderJSON = {order_id:order.orderAmountsMap,table_id:order.tableNumber};
                  
              },  
              onFailed: function(error){
                  console.log(error);
              }

      };
      RestControllerModule.createOrder(id,orden,callback);
    };
    
    return {
      showOrdersByTable: showOrdersByTable,
      updateOrder: updateOrder,
      getOrderByID: getOrderByID,
      getOrders: getOrders,     
      deleteOrderItem: deleteOrderItem,
      createOrder: createOrder
    };

})();

function selected() {
    
    var x = document.getElementById("opciones").value;
    var y;
    for (i = 0; i < ordenes.length; i++){
        if(ordenes[i][1].tableNumber.toString() === x){
            y = ordenes[i][1].orderAmountsMap;
            break;
        }
    }
    console.log(y);
    var table = document.getElementById("addTabla");
    var row = table.insertRow(table.length);
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    var tr0 = document.createElement("tr");
    var th = document.createElement("th");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    th.appendChild(document.createTextNode("Item Name"));
    th1.appendChild(document.createTextNode("Quatity"));
    tr0.appendChild(th);
    tr0.appendChild(th1);
    tr0.appendChild(th2);
    tr0.appendChild(th3);
    table.appendChild(tr0);
    var cont = 0;
    for(var j in y){
        
        var button1 = document.createElement("button");
        var texto1 = "Update";
        button1.setAttribute("value",texto1);
        button1.appendChild(document.createTextNode(texto1));
        button1.setAttribute("onclick","update()");
        var button2 = document.createElement("button");
        var texto2 = "Delete";
        button2.setAttribute("value",texto2);
        button2.appendChild(document.createTextNode(texto2));
        button2.setAttribute("onclick","eliminar()");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var quantity = document.createElement("input");
        var texxto = document.createElement("input");
        texxto.setAttribute("type","text");
        texxto.setAttribute("value",j);
        texxto.setAttribute("id","producto");
        texxto.setAttribute("disabled","true");
        quantity.setAttribute("type","text");
        quantity.setAttribute("value",y[j]);
        quantity.setAttribute("id","cantidad");
        td.appendChild(texxto);
        tr.appendChild(td);
        td1.appendChild(quantity);
        tr.appendChild(td1);
        td2.appendChild(button1);
        tr.appendChild(td2);
        td3.appendChild(button2);
        tr.appendChild(td3);
        table.appendChild(tr);
        cont++;
    }

}
function agregar(){
    var cant = document.getElementById("addQuantity").value;
    var mesa = document.getElementById("opciones").value;
    var orderAmountsMap = {};
    orderAmountsMap[document.getElementById("addValue").value] = cant;
    var objeto ={orderAmountsMap, tableNumber: mesa };
    OrdersControllerModule.updateOrder(mesa,objeto);
    selected();
    
}

function update(){
    var cant = document.getElementById("cantidad").value;
    var mesa = document.getElementById("opciones").value;
    var orderAmountsMap = {};
    orderAmountsMap[document.getElementById("producto").value] = cant;
    var objeto ={orderAmountsMap, tableNumber: mesa };
    OrdersControllerModule.updateOrder(mesa,objeto);
    selected();
}

function eliminar(){
    var cant = document.getElementById("cantidad").value;
    var mesa = document.getElementById("opciones").value;
    var orderAmountsMap = {};
    orderAmountsMap[document.getElementById("producto").value] = cant;
    var objeto ={orderAmountsMap, tableNumber: mesa };
    OrdersControllerModule.deleteOrderItem(mesa,objeto);
    selected();
}
function createOption(orders){ 
    for (i = 0; i < orders.length; i++){
            var seleccion = document.getElementById("opciones");
            var opcion = document.createElement("option");
            opcion.value = orders[i][1].tableNumber;
            opcion.appendChild(document.createTextNode("Table "+ orders[i][1].tableNumber));
            seleccion.appendChild(opcion);
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
	var content = document.getElementById("ordersDiv");
    //create a tag to identify which order is presented
	var inf = document.createElement("h3");
	inf.innerHTML="Table "+ String(orderInsert.table_id);
        inf.setAttribute("id","caption"+String(orderInsert.table_id));
    //create a DOM table
	var t = document.createElement("table");
    //put an id to the table to can identify that
	t.setAttribute("id",orderInsert.table_id);
	t.setAttribute("class", "table");
    //ad the caption and the table to the document
        content.appendChild(inf);
	content.appendChild(t);	
    //define the header of the table
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
	var db = document.createElement("p");
	db.setAttribute("class", "lead");
	var rtl = t.insertRow(t.rows.length);
        rtl.insertCell(0).appendChild(db);
        rtl.insertCell(1);
        rtl.insertCell(2).setAttribute("id",orderInsert.order_id+"total");
        getTotal(orderInsert.order_id);	
}

function getTotal(idMesa){
    axios.get('/orders/'+idMesa+'/total')
            .then(function (response) {
              //console.log(response['data']);
              document.getElementById(idMesa+"total").innerHTML=response['data'];
            })
            .catch(function (error) {
              console.log(error);
              alert("No podemos Completar la solicitud, puede que se muestren datos erroneos, intentelo de nuevo o mas tarde");
        });
}

