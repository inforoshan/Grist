package io.grits.backend.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderReportRequest
{
  private Long customerId;
  private String status;
  private String customerType;
  private Date startDate;
  private Date endDate;
}
