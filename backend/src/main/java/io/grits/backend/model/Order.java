//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_table")
public class Order
{
  @Id
  @SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
  @Column(name = "order_id", updatable = false)
  private Long orderId;
  @Column(name = "status", nullable = false, columnDefinition = "TEXT")
  private String status;
  @Column(name = "item_quantity", nullable = false, length = 20)
  private double itemQuantity;
  @Column(name = "price", nullable = false)
  private double price;
  @Column(name = "refund", nullable = false)
  private double refund;
  @Column(name = "transaction_token", nullable = false, columnDefinition = "TEXT")
  private String transactionToken;
  @Column(name = "contact", columnDefinition = "TEXT")
  private String contact;
  @Column(name = "commission_amount", nullable = false)
  private double commissionAmount;
  @Column(name = "commission_rate", nullable = false)
  private double commissionRate;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  private Date createdDate;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_date")
  private Date updatedDate;
  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;
  @JsonIgnore
  @OneToMany(mappedBy = "order")
  private List<OrderLine> orderLines;
}
