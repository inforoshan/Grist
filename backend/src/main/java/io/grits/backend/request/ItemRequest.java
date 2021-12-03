package io.grits.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest
{
  private Long customerId;
  private String status;
  private String rawMaterialName;
}
