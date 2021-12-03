package io.grits.backend.request;

import io.grits.backend.model.OrderLinePK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundRequest
{
  private Long orderId;
  private OrderLinePK orderLinePK;
}
