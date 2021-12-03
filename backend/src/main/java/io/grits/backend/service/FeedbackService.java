package io.grits.backend.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.grits.backend.model.FeedBack;
import io.grits.backend.model.RawMaterial;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.FeedBackRepository;
import io.grits.backend.repository.RawMaterialRepository;
import io.grits.backend.request.FeedbackRequest;
import io.grits.backend.response.FeedbackResponse;

@Service
public class FeedbackService
{
  @Autowired
  FeedBackRepository feedBackRepository;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  RawMaterialRepository rawMaterialRepository;

  @Transactional
  public String save(FeedbackRequest feedbackRequest)
  {
    FeedBack feedBack = new FeedBack();
    feedBack.setFeedBackComment(feedbackRequest.getComment());
    feedBack.setFeedbackFrom(feedbackRequest.getCustomerId().toString());
    feedBack.setFeedbackTo(feedbackRequest.getSupplierId().toString());
    feedBack.setCreatedDate(new Date());
    feedBack.setCustomer(customerRepository.findById(feedbackRequest.getCustomerId()).get());
    feedBack.setFeedbackStars(feedbackRequest.getStarVales());
    feedBack.setRawMaterial(rawMaterialRepository.findById(feedbackRequest.getRawId()).get());

    feedBackRepository.save(feedBack);


    RawMaterial rawMaterial = rawMaterialRepository.findById(feedbackRequest.getRawId()).get();
    rawMaterial.setRating(getRatingByRawId(feedbackRequest.getRawId()));

    rawMaterialRepository.save(rawMaterial);

    return "Successfully saved";
  }

  public FeedbackResponse getRatingBySupplier(String supplierId)
  {
    double statSum = feedBackRepository.sumByFeedbackStars(supplierId);
    Long count = feedBackRepository.countByFeedbackTo(supplierId);

    return statSum == 0 || count == 0 ? new FeedbackResponse(0) : new FeedbackResponse(statSum / count);
  }

  public Page<FeedBack> getFeedback(String supplierId, Pageable pageable)
  {
    return feedBackRepository.findByFeedbackTo(supplierId, pageable);
  }

  public double getRatingByRawId(Long rawId)
  {
    double statSum = feedBackRepository.sumByFeedback(rawId);
    Long count = feedBackRepository.countByRawId(rawId);

    return statSum == 0 || count == 0 ? 0 : (statSum / count);
  }
}
