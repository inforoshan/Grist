//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import io.grits.backend.model.Customer;
import io.grits.backend.model.Order;

public interface OrderRepository extends PagingAndSortingRepository<Order, Long>
{

  List<Order> findByCustomer(Customer customer);

  @Query(value = "SELECT order_table.customer_id, customer.customer_name, sum(order_table.price) FROM order_table inner join customer ON order_table.customer_id = customer.customer_id where order_table.created_date between :startDate AND :endDate AND order_table.status != 'REFUND' AND order_table.order_id in (select order_line.order_id from order_line where order_line.customer_id = :customerId group by order_line.customer_id) group by order_table.customer_id",
         nativeQuery = true)
  List<Object[]> findTopHoteliers(@Param("customerId") Long customerId,
                                  @Param("startDate") Date startDate,
                                  @Param("endDate") Date endDate);
}
