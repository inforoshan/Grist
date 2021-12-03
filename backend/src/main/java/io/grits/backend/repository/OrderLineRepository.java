//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.repository;

import java.sql.Array;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.AbstractJpaQuery;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import io.grits.backend.model.Customer;
import io.grits.backend.model.Order;
import io.grits.backend.model.OrderLine;
import io.grits.backend.model.OrderLinePK;
import io.grits.backend.model.RawMaterial;
import io.grits.backend.projection.RawData;
import io.grits.backend.request.RawMaterialUsage;

public interface OrderLineRepository extends PagingAndSortingRepository<OrderLine, OrderLinePK>
{
  Page<OrderLine> findByRawMaterial(RawMaterial rawMaterial, Pageable pageable);

  List<OrderLine> findByRawMaterialAndStatus(RawMaterial rawMaterial, String status);

  Page<OrderLine> findByCustomerAndStatus(Customer customer, String status, Pageable pageable);

  Page<OrderLine> findByOrderAndStatusNot(Order order, String status, Pageable pageable);

  Page<OrderLine> findByOrderAndStatus(Order order, String status, Pageable pageable);

  List<OrderLine> findAllByCustomerAndStatusAndUpdatedDateBetween(Customer customer,
                                                                  String status,
                                                                  Date startDate,
                                                                  Date endDate);

  List<OrderLine> findAllByOrderAndStatusNotAndCreatedDateBetween(Order order,
                                                                  String status,
                                                                  Date startDate,
                                                                  Date endDate);

  List<OrderLine> findByCustomerAndStatus(Customer customer, String status);

  @Query(value = "SELECT order_line.customer_id, order_line.raw_id, raw_material.raw_material_name, sum(order_line.requested_quantity), sum(price) FROM order_line inner join raw_material ON order_line.raw_id = raw_material.raw_id where order_line.created_date between :startDate AND :endDate AND order_line.status != 'REFUND' AND order_id in (select order_id from order_table where customer_id = :customerId) group by order_line.customer_id, order_line.raw_id",
         nativeQuery = true)
  List<Object[]> findByHotelierMaterialUsage(@Param("customerId") Long customerId,
                                             @Param("startDate") Date startDate,
                                             @Param("endDate") Date endDate);

  @Query(value = "SELECT order_line.customer_id, order_line.raw_id, raw_material.raw_material_name, sum(order_line.requested_quantity), sum(price) FROM order_line inner join raw_material ON order_line.raw_id = raw_material.raw_id where order_line.created_date between :startDate AND :endDate AND order_line.status != 'REFUND' AND raw_material.raw_material_name like %:rawName% AND order_id in (select order_id from order_table where customer_id = :customerId) group by order_line.customer_id, order_line.raw_id",
         nativeQuery = true)
  List<Object[]> findByHotelierMaterialUsageByName(@Param("customerId") Long customerId,
                                                   @Param("rawName") String rawName,
                                                   @Param("startDate") Date startDate,
                                                   @Param("endDate") Date endDate);
}
