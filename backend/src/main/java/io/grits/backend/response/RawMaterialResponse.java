//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RawMaterialResponse
{
  private Long rawId;
  private String rawMaterialName;
  private double unitPrice;
  private double quantity;
  private String[] imagePath;
  private Long customerId;
  private String unitType;
  private String description;
  private double rate;
}
