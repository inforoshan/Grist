package io.grits.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import io.grits.backend.model.FeedBack;

public interface FeedBackRepository extends PagingAndSortingRepository<FeedBack, Long>
{
  List<FeedBack> findByFeedbackFrom(String customerId);

  Page<FeedBack> findByFeedbackTo(String customerId, Pageable pageable);

  @Query(value = "SELECT SUM(feedback_stars) FROM feedback_table", nativeQuery = true)
  Double sumByFeedbackStars(String feedbackTo);

  Long countByFeedbackTo(String feedbackTo);

  @Query(value = "SELECT SUM(feedback_stars) FROM feedback_table where raw_id = :rawId", nativeQuery = true)
  Double sumByFeedback(@Param("rawId") Long rawId);

  @Query(value = "SELECT count(raw_id) FROM feedback_table where raw_id = :rawId", nativeQuery = true)
  Long countByRawId(@Param("rawId") Long rawId);
}
