//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest
{
  private String customerType;
  private String customerName;
  private String address;
  private int contact;
  private String location;
  private String backAccountNumber;
  private String backName;
  private String backBranch;
  private String userName;
  private String password;
  private String email;
  private String catagory;
}
