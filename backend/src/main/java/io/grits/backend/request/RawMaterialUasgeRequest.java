package io.grits.backend.request;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RawMaterialUasgeRequest
{
  private Long customerId;
  private String rawName;
  private Date startDate;
  private Date endDate;
}
