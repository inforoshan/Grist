//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(name = "user_email", columnNames = { "email" }) })
public class User
{
  @Id
  @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
  @Column(name = "user_id", updatable = false)
  private Long userId;
  @Column(name = "user_name", nullable = false, columnDefinition = "TEXT")
  private String userName;
  @JsonIgnore
  @Column(name = "password", nullable = false, columnDefinition = "TEXT")
  private String password;
  @Column(name = "email", nullable = false, columnDefinition = "TEXT")
  private String email;
  @Column(name = "active", nullable = false)
  private boolean active;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  private Date createdDate;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_date")
  private Date updatedDate;
  @ManyToOne
  @JoinColumn(name = "user_role_id")
  private UserRole userRole;
  @ManyToOne
  @JoinColumn(name = "customer_id", nullable = true)
  private Customer customer;
}
