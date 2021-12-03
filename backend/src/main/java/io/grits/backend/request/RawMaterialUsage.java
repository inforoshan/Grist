package io.grits.backend.request;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RawMaterialUsage
{
  private BigInteger customerId;
  private BigInteger rawId;
  private String rawMaterialName;
  private double totalQuantity;
  private double totalCost;
}
