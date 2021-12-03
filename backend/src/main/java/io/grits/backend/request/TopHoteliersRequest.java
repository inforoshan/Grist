package io.grits.backend.request;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopHoteliersRequest
{
  private Long customerId;
  private Date startDate;
  private Date endDate;
}
