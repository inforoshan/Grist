package io.grits.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest
{
  private Long customerId;
  private Long supplierId;
  private Long rawId;
  private double starVales;
  private String comment;
}
