package io.grits.backend.response;

import io.grits.backend.model.OrderLinePK;
import io.grits.backend.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineResponse
{
  private Long customerId;

  private double quantity;

  private String customerName;

  private String rawMaterialName;

  private Status status;

  private OrderLinePK orderLinePK;

  private String address;

  private double price;

  private Long rawId;
}
