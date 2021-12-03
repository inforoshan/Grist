//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest
{
  private double totalAmount;
  private String transactionToken;
  private double itemQuantity;
  private Long customerId;
  private List<OrderLineRequest> orderLine;
}
