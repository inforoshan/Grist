package io.grits.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer")
public class Customer
{
  @Id
  @SequenceGenerator(name = "customer_sequence", sequenceName = "customer_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_sequence")
  @Column(name = "customer_id", updatable = false)
  private Long customerId;
  @Column(name = "customer_name", nullable = false, columnDefinition = "TEXT")
  private String customerName;
  @Column(name = "location", nullable = true, columnDefinition = "TEXT")
  private String location;
  @Column(name = "contact", nullable = false, length = 20)
  private String contact;
  @Column(name = "address", nullable = false, columnDefinition = "TEXT")
  private String address;
  @Column(name = "back_account_number", nullable = false)
  private String backAccountNumber;
  @Column(name = "back_name", nullable = false)
  private String backName;
  @Column(name = "back_branch", nullable = false)
  private String backBranch;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  private Date createdDate;
  @Column(name = "catagory")
  private String catagory;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_date")
  private Date updatedDate;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customer")
  private List<User> users;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customer")
  private List<FeedBack> feedBacks;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customer")
  private List<RawMaterial> rawMaterials;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customer")
  private List<Order> orders;
  @ManyToOne
  @JoinColumn(name = "type_id")
  private CustomerType customerType;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customer")
  private List<OrderLine> orderLine;
}
