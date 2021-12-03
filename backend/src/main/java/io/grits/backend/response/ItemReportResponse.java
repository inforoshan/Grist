package io.grits.backend.response;

import java.util.Date;

import io.grits.backend.model.OrderLinePK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemReportResponse
{
  private Long customerId;

  private String customerName;

  private OrderLinePK orderLinePK;

  private Date orderDate;

  private String rawMaterialName;

  private double quantity;

  private double price;
}
