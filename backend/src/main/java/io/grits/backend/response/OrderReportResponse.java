package io.grits.backend.response;

import java.util.Date;

import io.grits.backend.model.OrderLinePK;
import io.grits.backend.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderReportResponse
{
  private Long customerId;

  private String customerName;

  private OrderLinePK orderLinePK;

  private double price;

  private Date orderDate;

}
