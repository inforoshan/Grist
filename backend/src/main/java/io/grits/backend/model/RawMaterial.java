//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.model;

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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "raw_material")
public class RawMaterial
{
  @Id
  @SequenceGenerator(name = "raw_material_sequence", sequenceName = "raw_material_sequence", initialValue = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "raw_material_sequence")
  @Column(name = "raw_id", updatable = false)
  private Long rawId;
  @Column(name = "raw_material_name", nullable = false, columnDefinition = "TEXT")
  private String rawMaterialName;
  @Column(name = "unit_price", nullable = false)
  private double unitPrice;
  @Column(name = "unit_type", nullable = false, columnDefinition = "TEXT")
  private String unitType;
  @Column(name = "quantity", nullable = false)
  private double quantity;
  @Column(name = "rating", columnDefinition = "double default 0")
  private double rating;
  @Column(name = "image_path", nullable = false, columnDefinition = "TEXT")
  private String imagePath;
  @Column(name = "description", nullable = false, columnDefinition = "TEXT")
  private String description;
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
  @OneToMany(mappedBy = "rawMaterial")
  private List<OrderLine> orderLines;
  @JsonManagedReference
  @OneToMany(mappedBy = "rawMaterial")
  private List<FeedBack> feedBacks;
}
