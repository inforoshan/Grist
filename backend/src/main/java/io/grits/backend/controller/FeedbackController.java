package io.grits.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.grits.backend.model.FeedBack;
import io.grits.backend.request.FeedbackRequest;
import io.grits.backend.response.FeedbackResponse;
import io.grits.backend.service.FeedbackService;

@RestController
@RequestMapping({ "/api/feedback" })
public class FeedbackController
{
  @Autowired
  FeedbackService feedbackService;

  @PostMapping("/feedback")
  public ResponseEntity<String> feedback(@RequestBody FeedbackRequest feedbackRequest)
  {
    try
    {
      return ResponseEntity.ok(feedbackService.save(feedbackRequest));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body("Feedback not saved");
    }
  }

  @GetMapping("/feedback-rating")
  public ResponseEntity<FeedbackResponse> getRatingBySupplier(@RequestParam("supplierId") String supplierId)
  {
    try
    {
      return ResponseEntity.ok(feedbackService.getRatingBySupplier(supplierId));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping("/feedback-by-supplier")
  public ResponseEntity<Page<FeedBack>> getFeedBackBySupplier(@RequestParam("supplierId") String supplierId, Pageable pageable)
  {
    try
    {
      return ResponseEntity.ok(feedbackService.getFeedback(supplierId, pageable));
    }
    catch (Exception exception)
    {
      return ResponseEntity.badRequest().body(null);
    }
  }
}
