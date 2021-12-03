//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import io.grits.backend.exception.OrderException;
import io.grits.backend.model.Customer;
import io.grits.backend.model.Order;
import io.grits.backend.model.OrderLine;
import io.grits.backend.model.OrderLinePK;
import io.grits.backend.model.RawMaterial;
import io.grits.backend.model.Status;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.OrderLineRepository;
import io.grits.backend.repository.OrderRepository;
import io.grits.backend.repository.RawMaterialRepository;
import io.grits.backend.request.OrderLineRequest;
import io.grits.backend.request.OrderRequest;
import io.grits.backend.request.RawMaterialUsage;
import io.grits.backend.response.ItemReportResponse;
import io.grits.backend.response.OrderLineResponse;
import io.grits.backend.response.OrderReportResponse;
import io.grits.backend.response.TopHoteliersResponse;

@Service
public class OrderService
{
  @Autowired
  OrderRepository orderRepository;
  @Autowired
  OrderLineRepository orderLineRepository;
  @Autowired
  CustomerRepository customerRepository;
  @Autowired
  RawMaterialRepository rawMaterialRepository;
  @Value("commission.rate")
  String commissionRate;

  double commissionRateValue = 0.1D;

  public OrderService()
  {
  }

  @Transactional
  public void placedOrder(OrderRequest request) throws OrderException
  {
    if (this.customerRepository.findById(request.getCustomerId()).isPresent())
    {
      Customer customer = this.customerRepository.findById(request.getCustomerId()).get();
      Order order = new Order();
      order.setStatus(Status.IN_PROGRESS.toString());
      order.setItemQuantity(request.getItemQuantity());
      order.setPrice(request.getTotalAmount());
      order.setCustomer(customer);
      order.setCommissionAmount(this.getCommission(request.getTotalAmount()));
      order.setCommissionRate(commissionRateValue);
      order.setContact(String.valueOf(customer.getContact()));
      order.setTransactionToken(request.getTransactionToken());
      order.setCreatedDate(new Date());
      this.orderRepository.save(order);
      this.mapOrderLine(request.getOrderLine(), order);
    }
    else
    {
      throw new OrderException("Customer not found !!!");
    }
  }

  private double getCommission(double totalPrice)
  {
    return totalPrice * commissionRateValue;
  }

  @Transactional
  private void mapOrderLine(List<OrderLineRequest> orderLineRequests, Order order)
  {
    orderLineRequests.forEach((data) -> {
      RawMaterial rawMaterial = this.rawMaterialRepository.findById(data.getRawId()).get();
      rawMaterial.setQuantity(rawMaterial.getQuantity() - data.getQuantity());
      rawMaterial.setUpdatedDate(new Date());
      this.rawMaterialRepository.save(rawMaterial);

      double totalAmount = data.getUnitPrice() * data.getQuantity();

      OrderLine orderLine = new OrderLine();
      orderLine.setOrderLinePK(new OrderLinePK(order.getOrderId(), data.getRawId()));
      orderLine.setPrice(totalAmount - (totalAmount * commissionRateValue));
      orderLine.setOrder(order);
      orderLine.setRawMaterial(rawMaterial);
      orderLine.setRequestedQuantity(data.getQuantity());
      orderLine.setStatus(Status.IN_PROGRESS.toString());
      orderLine.setCustomer(this.customerRepository.getOne(data.getSupplier()));
      orderLine.setCreatedDate(new Date());
      this.orderLineRepository.save(orderLine);

    });
  }

  public Page<Order> getAllOrders(Pageable pageable)
  {
    return this.orderRepository.findAll(pageable);
  }

  public Page<OrderLine> getAllOrderLine(Pageable pageable)
  {
    return this.orderLineRepository.findAll(pageable);
  }

  public Page<OrderLine> getAllOrdersByRawId(Long rawId, Pageable pageable)
  {
    return this.orderLineRepository.findByRawMaterial(this.rawMaterialRepository.findById(rawId).get(), pageable);
  }

  public Page<OrderLineResponse> getAllOrderByCustomer(Long customerId,
                                                       String status,
                                                       String customerType,
                                                       Pageable pageable)
  {
    try
    {
      if (customerType.equals("Supplier"))
      {

        return this.orderLineRepository
          .findByCustomerAndStatus(customerRepository.findById(customerId).get(), status, pageable)
          .map(orderLine -> new OrderLineResponse(orderLine.getCustomer().getCustomerId(),
                                                  orderLine.getRequestedQuantity(),
                                                  orderLine.getOrder().getCustomer().getCustomerName(),
                                                  orderLine.getRawMaterial().getRawMaterialName(),
                                                  Status.valueOf(orderLine.getStatus()),
                                                  orderLine.getOrderLinePK(),
                                                  orderLine.getOrder().getCustomer().getAddress(),
                                                  orderLine.getPrice(),
                                                  orderLine.getRawMaterial().getRawId()));
      }
      else if (status.equals("Available"))
      {
        List<OrderLineResponse> orderLineResponseList = new ArrayList<>();

        orderRepository.findByCustomer(customerRepository.findById(customerId).get()).forEach(order -> {
          orderLineRepository.findByOrderAndStatusNot(order, Status.REFUND.toString(), pageable).forEach(orderLine -> {

            orderLineResponseList.add(new OrderLineResponse(orderLine.getCustomer().getCustomerId(),
                                                            orderLine.getRequestedQuantity(),
                                                            orderLine.getCustomer().getCustomerName(),
                                                            orderLine.getRawMaterial().getRawMaterialName(),
                                                            Status.valueOf(orderLine.getStatus()),
                                                            orderLine.getOrderLinePK(),
                                                            orderLine.getOrder().getCustomer().getAddress(),
                                                            orderLine.getPrice(),
                                                            orderLine.getRawMaterial().getRawId()));
          });
        });
        return new PageImpl<>(orderLineResponseList, pageable, orderLineResponseList.stream().count());
      }
      else
      {

        List<OrderLineResponse> orderLineResponseList = new ArrayList<>();

        orderRepository.findByCustomer(customerRepository.findById(customerId).get()).forEach(order -> {
          orderLineRepository.findByOrderAndStatus(order, Status.REFUND.toString(), pageable)
            .forEach(orderLine -> orderLineResponseList
              .add(new OrderLineResponse(orderLine.getCustomer().getCustomerId(),
                                         orderLine.getRequestedQuantity(),
                                         orderLine.getCustomer().getCustomerName(),
                                         orderLine.getRawMaterial().getRawMaterialName(),
                                         Status.valueOf(orderLine.getStatus()),
                                         orderLine.getOrderLinePK(),
                                         orderLine.getOrder().getCustomer().getAddress(),
                                         orderLine.getPrice(),
                                         orderLine.getRawMaterial().getRawId())));
        });

        return new PageImpl<>(orderLineResponseList, pageable, orderLineResponseList.stream().count());
      }
    }
    catch (Exception exception)
    {
      exception.printStackTrace();
    }
    return null;
  }

  public OrderLine getOrderLineByPk(OrderLinePK orderLinePK)
  {
    return this.orderLineRepository.findById(orderLinePK).get();
  }

  public Order getOrderById(Long orderId)
  {
    return this.orderRepository.findById(orderId).get();
  }

  @Transactional
  public String refunds(Long orderId, OrderLinePK orderLinePK) throws Exception
  {
    try
    {
      OrderLine orderLine = this.getOrderLineByPk(orderLinePK);
      orderLine.setUpdatedDate(new Date());
      orderLine.setStatus(Status.REFUND.toString());
      this.orderLineRepository.save(orderLine);

      RawMaterial rawMaterial = this.rawMaterialRepository.findById(orderLinePK.getRawId()).get();
      double oldQty = rawMaterial.getQuantity();
      rawMaterial.setQuantity(orderLine.getRequestedQuantity() + oldQty);
      rawMaterial.setUpdatedDate(new Date());
      this.rawMaterialRepository.save(rawMaterial);

      Order oldOrder = this.getOrderById(orderId);
      double oldPrice = oldOrder.getPrice();
      double oldCommissionPrice = oldOrder.getCommissionAmount();
      double totalAmount = orderLine.getPrice() / (1 - commissionRateValue);
      double commissionDeduct = totalAmount - orderLine.getPrice();

      double priceDeduction = oldPrice - totalAmount;

      oldOrder.setPrice(priceDeduction);
      oldOrder.setCommissionAmount(oldCommissionPrice - commissionDeduct);
      oldOrder.setItemQuantity(oldOrder.getItemQuantity() - 1);
      oldOrder.setStatus(Status.REFUND.toString());
      oldOrder.setRefund(orderLine.getPrice() + commissionDeduct);
      this.orderRepository.save(oldOrder);

      return "Successfully refund";
    }
    catch (Exception exception)
    {
      throw new Exception(exception.getMessage(), exception);
    }
  }

  public String changeState(OrderLinePK orderLinePK, Status status)
  {
    OrderLine orderLine = this.getOrderLineByPk(orderLinePK);
    orderLine.setUpdatedDate(new Date());
    orderLine.setStatus(status.toString());

    orderLineRepository.save(orderLine);

    return "Successfully change the status";
  }

  public List<OrderReportResponse> getOrderReportByDate(Long customerId,
                                                        Status status,
                                                        String customerType,
                                                        Date startDate,
                                                        Date endDate)
  {
    if (customerType.equals("Supplier"))
    {
      return orderLineRepository
        .findAllByCustomerAndStatusAndUpdatedDateBetween(customerRepository.findById(customerId).get(),
                                                         status.toString(),
                                                         startDate,
                                                         endDate)
        .stream()
        .map(orderLine -> new OrderReportResponse(orderLine.getOrder().getCustomer().getCustomerId(),
                                                  orderLine.getOrder().getCustomer().getCustomerName(),
                                                  orderLine.getOrderLinePK(),
                                                  orderLine.getPrice(),
                                                  orderLine.getUpdatedDate()))
        .collect(Collectors.toList());
    }
    else
    {
      List<OrderReportResponse> orderReportResponses = new ArrayList<>();
      orderRepository.findByCustomer(customerRepository.findById(customerId).get()).forEach(order -> {
        orderLineRepository
          .findAllByOrderAndStatusNotAndCreatedDateBetween(order, status.toString(), startDate, endDate)
          .forEach(orderLine -> {
            double totalPrice = orderLine.getPrice() / (1 - commissionRateValue);
            orderReportResponses.add(new OrderReportResponse(orderLine.getCustomer().getCustomerId(),
                                                             orderLine.getCustomer().getCustomerName(),
                                                             orderLine.getOrderLinePK(),
                                                             totalPrice,
                                                             orderLine.getCreatedDate()));
          });

      });
      return orderReportResponses;
    }
  }

  public List<ItemReportResponse> getOrderReportByName(Long customerId, Status status, String rawMaterialName)
  {
    List<ItemReportResponse> itemReportResponse = new ArrayList<>();

    rawMaterialRepository
      .findByCustomerAndRawMaterialNameIsContaining(customerRepository.findById(customerId).get(), rawMaterialName)
      .forEach(rawMaterial -> {
        orderLineRepository.findByRawMaterialAndStatus(rawMaterial, status.toString())
          .forEach(orderLine -> itemReportResponse
            .add(new ItemReportResponse(orderLine.getOrder().getCustomer().getCustomerId(),
                                        orderLine.getOrder().getCustomer().getCustomerName(),
                                        orderLine.getOrderLinePK(),
                                        orderLine.getUpdatedDate(),
                                        orderLine.getRawMaterial().getRawMaterialName(),
                                        orderLine.getRequestedQuantity(),
                                        orderLine.getPrice())));
      });

    return itemReportResponse;
  }

  public List<ItemReportResponse> getAllItems(Long customerId, Status status)
  {
    return orderLineRepository.findByCustomerAndStatus(customerRepository.findById(customerId).get(), status.toString())
      .stream()
      .map(orderLine -> new ItemReportResponse(orderLine.getOrder().getCustomer().getCustomerId(),
                                               orderLine.getOrder().getCustomer().getCustomerName(),
                                               orderLine.getOrderLinePK(),
                                               orderLine.getUpdatedDate(),
                                               orderLine.getRawMaterial().getRawMaterialName(),
                                               orderLine.getRequestedQuantity(),
                                               orderLine.getPrice()))
      .collect(Collectors.toList());

  }

  public List<RawMaterialUsage> findByHotelierMaterialUsage(Long customerId, Date startDate, Date endDate)
  {
    return orderLineRepository.findByHotelierMaterialUsage(customerId, startDate, endDate).stream()
      .map(data -> new RawMaterialUsage((BigInteger) data[0], (BigInteger) data[1], (String) data[2], (double) data[3], (double) data[4]))
      .collect(Collectors.toList());
  }

  public List<RawMaterialUsage> findByHotelierMaterialUsageByName(Long customerId,
                                                                  String rawName,
                                                                  Date startDate,
                                                                  Date endDate)
  {
    return orderLineRepository.findByHotelierMaterialUsageByName(customerId, rawName, startDate, endDate).stream()
      .map(data -> new RawMaterialUsage((BigInteger) data[0], (BigInteger) data[1], (String) data[2], (double) data[3], (double) data[4]))
      .collect(Collectors.toList());
  }

  public List<TopHoteliersResponse> findTopHoteliers(Long customerId, Date startDate, Date endDate)
  {
    return orderRepository.findTopHoteliers(customerId, startDate, endDate).stream()
      .map(data -> new TopHoteliersResponse((BigInteger) data[0], (String) data[1], (double) data[2]))
      .collect(Collectors.toList());
  }
}
