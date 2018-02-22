/**
* @author jefferson Castaneda
*/
var orders =[];
products = [{Product:"HAMBURGER",Quantity:3,Price:10000},{Product:"PIZZA",Quantity:1,Price:3000},{Product:"COKE",Quantity:4,Price:5200}];
var order = {IdOrder:1, Products:products};
orders.push(order);

function chargeOrders(){
	for (i=0;i<orders.length;i++){
		insertTableOrder(orders[i]);
	}	
}

function addProductToOrder(idOrder){
	var lastIndex = ordersTable[ordersTable.length-1].IdOrder;
	var newOrder = {IdOrder:lastIndex+1,Product:"CHOP SUEY",Quantity:2,Price:15000};
	var t = document.getElementById(idOrder);
	var rowdata = t.insertRow(t.rows.length);
	var n=rowdata.insertCell(0);
	var q =rowdata.insertCell(1);
	var p = rowdata.insertCell(2);
	n.appendChild(document.createTextNode(newOrder.Product));
	q.appendChild(document.createTextNode(newOrder.Quantity));
	p.appendChild(document.createTextNode(newOrder.Price));
}

function setTableHeader(rowHeader){
	var pr = document.createElement("th");
	pr.innerHTML = "Product";
	rowHeader.appendChild(pr);
	var qa = document.createElement("th");
	rowHeader.appendChild(qa);
	qa.innerHTML = "Quantity";
	var pc = document.createElement("th");
	pc.innerHTML = "Price";
	rowHeader.appendChild(pc);
}

/**
* @param orderInsert order to be added at DOM through table representation
*/
function insertTableOrder(orderInsert){
	//get the parent content of the tables representation of the orders
	var content = document.getElementById("OrdersDiv");
	//create a tag to identify which order is presented
	var inf = document.createElement("caption");
	inf.innerHTML="ORDER "+ String(orderInsert.IdOrder);
	//create a DOM table
	var t = document.createElement("table");
	t.appendChild(inf);
	t.setAttribute("id",orders.length);
	t.setAttribute("class", "table");
	content.appendChild(t);	
	var th = document.createElement("thead");
	th.setAttribute("class","thead-light");
	var tr = document.createElement("tr");
	setTableHeader(tr);
	th.appendChild(tr);
	t.appendChild(th);
	//get the products of the current order
	var productInsert = orderInsert.Products;
	//insert all products of the order registring all of the objects in productInsert
	for (i = 0; i < productInsert.length; i++){
		var rp = t.insertRow(t.rows.length);
		rp.insertCell(0).appendChild(document.createTextNode(productInsert[i].Product));
		rp.insertCell(1).appendChild(document.createTextNode(productInsert[i].Quantity));
		rp.insertCell(2).appendChild(document.createTextNode(productInsert[i].Price));
	}	
	//create the button to delete the order
	var db = document.createElement("p");
	db.setAttribute("class", "lead");
	t.insertRow(t.rows.length).insertCell(0).appendChild(db);
	var b = document.createElement("a");
	b.setAttribute("class","btn btn-lg");
	b.innerHTML = "Remove this Order";
	b.setAttribute("onclick","removeOrderById("+String(orderInsert.IdOrder)+")");
	db.appendChild(b);
		
}

function addOrder(){
	products =[{Product:"HOTDOG",Quantity:3,Price:9000},{Product:"PIZZA",Quantity:1,Price:3000},{Product:"COKE",Quantity:1,Price:1300}];
	order = {IdOrder:orders.length+1,Products:products};
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
}