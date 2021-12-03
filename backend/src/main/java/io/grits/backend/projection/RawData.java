package io.grits.backend.projection;

import lombok.Value;

@Value
public class RawData
{
  private Long OrderId;

  private Long customerId;

  private Long rawId;

  private String rawMaterialName;

  private double totalCost;
}
