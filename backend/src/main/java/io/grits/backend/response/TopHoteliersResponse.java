package io.grits.backend.response;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopHoteliersResponse
{
  private BigInteger hotelId;
  private String hotelName;
  private double totalIncome;
}
