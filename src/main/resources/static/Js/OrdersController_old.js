/**
* @author jefferson Castaneda
*/
var orders =[];
var products;
var order;
var currentTotal=0;

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

function dialog() {
    alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
}

function getTotal(idMesa){
    axios.get('/orders/'+idMesa+'/total')
            .then(function (response) {
              //console.log(response['data']);
              document.getElementById(idMesa+"total").innerHTML=response['data'];
            })
            .catch(function (error) {
              console.log(error);
              dialog();
        });
}


function addProductToOrder(idOrder){
	var newOrder = {product:"CHOP SUEY",quantity:2,Price:15000};
	var t = document.getElementById(idOrder);
	var rowdata = t.insertRow(t.rows.length);
	var n=rowdata.insertCell(0);
	var q =rowdata.insertCell(1);
	//var p = rowdata.insertCell(2);
	n.appendChild(document.createTextNode(newOrder.product));
	q.appendChild(document.createTextNode(newOrder.quantity));
	//p.appendChild(document.createTextNode(newOrder.Price));
}



/**
* @param orderInsert order to be added at DOM through table representation
*/
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
        getTotal(orderInsert.order_id);
	var b = document.createElement("a");
	b.setAttribute("class","btn btn-lg");
	b.innerHTML = "Remove this Order";
	b.setAttribute("onclick","removeOrderById("+String(orderInsert.table_id)+")");
	db.appendChild(b);
        orders.push(orderInsert);	
}

function addOrder(){
    products =[{product:"HOTDOG",quantity:3,Price:9000},{product:"PIZZA",quantity:1,Price:3000},{product:"COKE",quantity:1,Price:1300}];
    var max = 0;
    for (i=0;i<orders.length-1;i++){
        if (orders[i].order_id>orders[i+1].order_id){
            max=orders[i].order_id;
        }else{
            max=orders[i+1].order_id;
        }
    }
    order = {order_id:parseInt(max)+1,table_id:parseInt(max)+1,products:products};
    orders.push(order);
    insertTableOrder(order);		
}


function removeOrderById(intId){
    var lo = document.getElementsByTagName("table");
    for (i=0; i<lo.length;i++){
	if (lo[i].getAttribute("id")==intId){
            lo[i].parentNode.removeChild(lo[i]);
	}
    }
    for (i=0;i<orders.length;i++){
        if (parseInt(orders[i].order_id)==parseInt(intId)){
            orders.splice(i,1);
        }
    }
}

