//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer_type")
public class CustomerType
{
  @Id
  @SequenceGenerator(name = "type_sequence", sequenceName = "type_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "type_sequence")
  @Column(name = "type_id", updatable = false)
  private Long typeId;
  @Column(name = "type_name", nullable = false, columnDefinition = "TEXT")
  private String typeName;
  @JsonIgnore
  @Transient
  @OneToMany(mappedBy = "customerType")
  private List<Customer> customers;
}
