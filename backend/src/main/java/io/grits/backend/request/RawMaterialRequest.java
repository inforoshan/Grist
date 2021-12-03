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
public class RawMaterialRequest
{
  private Long customerId;
  private Long rawId;
  private String unitType;
  private double unitPrice;
  private List<String> path;
  private double quantity;
  private String rawMaterialName;
  private String description;
}
