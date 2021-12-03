//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.grits.backend.exception.OrderException;
import io.grits.backend.model.OrderLine;
import io.grits.backend.model.OrderLinePK;
import io.grits.backend.model.Status;
import io.grits.backend.request.ItemRequest;
import io.grits.backend.request.OrderReportRequest;
import io.grits.backend.request.OrderRequest;
import io.grits.backend.request.RawMaterialUasgeRequest;
import io.grits.backend.request.RawMaterialUsage;
import io.grits.backend.request.RefundRequest;
import io.grits.backend.request.TopHoteliersRequest;
import io.grits.backend.response.ItemReportResponse;
import io.grits.backend.response.OrderLineResponse;
import io.grits.backend.response.OrderReportResponse;
import io.grits.backend.response.TopHoteliersResponse;
import io.grits.backend.service.OrderService;

@RestController
@RequestMapping({ "/api/order" })
public class OrderController
{
  @Autowired
  OrderService orderService;

  @PostMapping({ "/placed-order" })
  public ResponseEntity<String> placedOrder(@RequestBody OrderRequest orderRequest)
  {
    try
    {
      this.orderService.placedOrder(orderRequest);

      return ResponseEntity.ok("Order Success !!!");
    }
    catch (OrderException var3)
    {
      return ResponseEntity.badRequest().body("Order not found !!!! " + var3.getMessage());
    }
  }

  @GetMapping({ "/get-order" })
  public ResponseEntity<Page<OrderLine>> getOrders(Pageable pageable)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getAllOrderLine(pageable));
    }
    catch (Exception var3)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping({ "/order-line-by-rawId" })
  public ResponseEntity<Page<OrderLine>> getOrderLineByRawId(@RequestParam("rawId") Long rawId, Pageable pageable)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getAllOrdersByRawId(rawId, pageable));
    }
    catch (Exception var4)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping({ "/order-line-by-customer" })
  public ResponseEntity<Page<OrderLineResponse>> getOrderLineByCustomer(@RequestParam("customerId") Long customerId,
                                                                        @RequestParam("status") String status,
                                                                        @RequestParam("customerType") String customerType,
                                                                        Pageable pageable)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getAllOrderByCustomer(customerId, status, customerType, pageable));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping({ "order-line-by-pk" })
  public ResponseEntity<OrderLine> getOrderLineByCustomer(@RequestParam("orderId") Long orderId,
                                                          @RequestParam("rawId") Long rawId)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getOrderLineByPk(new OrderLinePK(orderId, rawId)));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping({ "order-transaction-token" })
  public ResponseEntity<String> getOrderTransactionToken(@RequestParam("OrderId") Long orderId)
  {
    return ResponseEntity.ok(this.orderService.getOrderById(orderId).getTransactionToken());
  }

  @PostMapping({ "order-refund" })
  public ResponseEntity<String> orderRefund(@RequestBody RefundRequest request)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.refunds(request.getOrderId(), request.getOrderLinePK()));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body("Refund fail !!!!");
    }
  }

  @GetMapping({ "/order-line-state-change" })
  public ResponseEntity<String> changeStatus(@RequestParam("orderId") Long orderId,
                                             @RequestParam("rawId") Long rawId,
                                             @RequestParam("status") String status)
  {
    try
    {
      return ResponseEntity.ok(orderService.changeState(new OrderLinePK(orderId, rawId), Status.valueOf(status)));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body("State change fail !!!");
    }
  }

  @PostMapping({ "/orders-report" })
  public ResponseEntity<List<OrderReportResponse>> getOrderReport(@RequestBody OrderReportRequest orderReportRequest)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getOrderReportByDate(orderReportRequest.getCustomerId(),
                                                                      Status.valueOf(orderReportRequest.getStatus()),
                                                                      orderReportRequest.getCustomerType(),
                                                                      orderReportRequest.getStartDate(),
                                                                      orderReportRequest.getEndDate()));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @PostMapping("/items-sales-report")
  public ResponseEntity<List<ItemReportResponse>> getItemReport(@RequestBody ItemRequest itemRequest)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getOrderReportByName(itemRequest.getCustomerId(),
                                                                      Status.valueOf(itemRequest.getStatus()),
                                                                      itemRequest.getRawMaterialName()));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping("/all-sales-items")
  public ResponseEntity<List<ItemReportResponse>> getAllSalesItem(@RequestParam("customerId") Long customerId,
                                                                  @RequestParam("status") String status)
  {
    try
    {
      return ResponseEntity.ok(this.orderService.getAllItems(customerId, Status.valueOf(status)));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @PostMapping("/rawMaterialUsage")
  public ResponseEntity<List<RawMaterialUsage>> getHotelierMaterialUsage(@RequestBody RawMaterialUasgeRequest rawMaterialUasgeRequest)
  {
    if (rawMaterialUasgeRequest.getRawName() == null)
    {
      return ResponseEntity.ok(orderService.findByHotelierMaterialUsage(rawMaterialUasgeRequest.getCustomerId(),
                                                                        rawMaterialUasgeRequest.getStartDate(),
                                                                        rawMaterialUasgeRequest.getEndDate()));
    }
    else
    {
      return ResponseEntity.ok(orderService.findByHotelierMaterialUsageByName(rawMaterialUasgeRequest.getCustomerId(),
                                                                              rawMaterialUasgeRequest.getRawName(),
                                                                              rawMaterialUasgeRequest.getStartDate(),
                                                                              rawMaterialUasgeRequest.getEndDate()));
    }
  }

  @PostMapping("/topBuyers")
  public ResponseEntity<List<TopHoteliersResponse>> getTopBuyers(@RequestBody TopHoteliersRequest topHoteliersRequest)
  {
    return ResponseEntity.ok(orderService.findTopHoteliers(topHoteliersRequest.getCustomerId(),
                                                           topHoteliersRequest.getStartDate(),
                                                           topHoteliersRequest.getEndDate()));
  }
}
