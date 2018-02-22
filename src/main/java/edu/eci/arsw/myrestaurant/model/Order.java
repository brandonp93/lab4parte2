package edu.eci.arsw.myrestaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class Order {


    private Map<String, Integer> orderAmountsMap;

    public Map<String, Integer> getOrderAmountsMap() {
        return orderAmountsMap;
    }

    public void setOrderAmountsMap(Map<String, Integer> orderAmountsMap) {
        this.orderAmountsMap = orderAmountsMap;
    }
    private int tableNumber;

    public Order() {
    }    
    
    public Order(int tableNumber) {
        orderAmountsMap = new ConcurrentHashMap<>();
        this.tableNumber = tableNumber;
    }
    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void addDish(String plate, int amount) throws OrderServicesException{
        if (amount<0){
            throw new OrderServicesException("Error 400: the amount must be positive, the operation was canceled");
        }else{
            if (!orderAmountsMap.containsKey(plate)){
                orderAmountsMap.put(plate, amount);
            }
            else{
                orderAmountsMap.put(plate, orderAmountsMap.get(plate)+amount);
            }
        }
    }

    public void deleteDish(String plate, int amount) throws OrderServicesException{
        if (orderAmountsMap.containsKey(plate)){
            int delta = orderAmountsMap.get(plate)-amount;
            if (delta>0){
                orderAmountsMap.replace(plate, delta); 
            }else{
                orderAmountsMap.remove(plate);
            }
        }  
        else{
            throw new OrderServicesException("Error 404: the dish was not found in the table");            
        }
    }
    
    @JsonIgnore
    public Set<String> getOrderedDishes() {
        return orderAmountsMap.keySet();
    }

    public int getDishOrderedAmount(String p) {
        if (!orderAmountsMap.containsKey(p)) {
            return 0;
        } else {
            return orderAmountsMap.get(p);
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Table " + tableNumber+"\n");
        getOrderedDishes().forEach((p) -> {
            sb.append(p).append(" x ").append(orderAmountsMap.get(p)).append("\n");
        });
        return sb.toString();

    }

}
