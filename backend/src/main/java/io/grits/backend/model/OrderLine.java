//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@Table(name = "order_line")
public class OrderLine
{
  @EmbeddedId
  private OrderLinePK orderLinePK;
  @Column(name = "requested_quantity", nullable = false)
  private double requestedQuantity;
  @Column(name = "price", nullable = false, columnDefinition = "Decimal(15,2)")
  private double price;
  @Column(name = "status", nullable = false, columnDefinition = "TEXT")
  private String status;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  private Date createdDate;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_date")
  private Date updatedDate;
  @ManyToOne(cascade = { CascadeType.ALL })
  @JoinColumn(name = "fk_raw_id", referencedColumnName = "raw_id")
  private RawMaterial rawMaterial;
  @ManyToOne
  @JoinColumn(name = "fk_order_id", referencedColumnName = "order_id")
  private Order order;
  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;
}
