//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.model;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "feedback_table")
public class FeedBack
{
  @Id
  @SequenceGenerator(name = "feedback_sequence", sequenceName = "feedback_sequence", initialValue = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feedback_sequence")
  @Column(name = "feedback_id", updatable = false)
  private Long feedbackId;
  @Column(name = "feedback_from", columnDefinition = "TEXT")
  private String feedbackFrom;
  @Column(name = "feedback_to", columnDefinition = "TEXT")
  private String feedbackTo;
  @Column(name = "feedback_stars", length = 5)
  private double feedbackStars;
  @Column(name = "feedBack_comment", columnDefinition = "TEXT")
  private String feedBackComment;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  private Date createdDate;
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_date")
  private Date updatedDate;
  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;
  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "raw_id")
  private RawMaterial rawMaterial;
}
