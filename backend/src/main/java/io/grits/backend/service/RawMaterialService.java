//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.grits.backend.exception.RawMaterialException;
import io.grits.backend.model.Customer;
import io.grits.backend.model.FeedBack;
import io.grits.backend.model.RawMaterial;
import io.grits.backend.repository.CustomerRepository;
import io.grits.backend.repository.RawMaterialRepository;
import io.grits.backend.request.RawMaterialRequest;
import io.grits.backend.response.RawMaterialResponse;

@Service
public class RawMaterialService
{
  @Autowired
  RawMaterialRepository rawMaterialRepository;
  @Autowired
  CustomerRepository customerRepository;

  public RawMaterialService()
  {
  }

  public void saveRawMaterials(RawMaterialRequest rawMaterialRequest) throws RawMaterialException
  {
    if (this.customerRepository.findById(rawMaterialRequest.getCustomerId()).isPresent())
    {

      System.out.println("Save IN " + rawMaterialRequest);
      Customer customer = this.customerRepository.findById(rawMaterialRequest.getCustomerId()).get();
      String joined = String.join(",", rawMaterialRequest.getPath());
      RawMaterial rawMaterial = new RawMaterial();
      rawMaterial.setRawMaterialName(rawMaterialRequest.getRawMaterialName());
      rawMaterial.setImagePath(joined);
      rawMaterial.setQuantity(rawMaterialRequest.getQuantity());
      rawMaterial.setUnitPrice(rawMaterialRequest.getUnitPrice());
      rawMaterial.setUnitType(rawMaterialRequest.getUnitType());
      rawMaterial.setCustomer(customer);
      rawMaterial.setDescription(rawMaterialRequest.getDescription());
      rawMaterial.setCreatedDate(new Date());
      this.rawMaterialRepository.save(rawMaterial);
    }
    else
    {
      throw new RawMaterialException("Customer not found !!!");
    }
  }

  public Page<RawMaterial> getRawMaterials(Pageable pageable)
  {
    return this.rawMaterialRepository.findAll(pageable);
  }

  public List<RawMaterialResponse> getRawMaterialsByCustomerId(Long customerId)
  {
    List<RawMaterial> rawMaterial = this.rawMaterialRepository.findByCustomerId(customerId);
    List<RawMaterialResponse> rawMaterialResponses = this.getRawMaterialResponses(rawMaterial);
    return rawMaterialResponses;
  }

  public void updateRawMaterials(RawMaterialRequest rawMaterialRequest)
  {
    String joined = String.join(",", rawMaterialRequest.getPath());
    RawMaterial oldRawMaterial = this.rawMaterialRepository.findById(rawMaterialRequest.getRawId()).orElse(null);
    oldRawMaterial.setRawMaterialName(rawMaterialRequest.getRawMaterialName());
    oldRawMaterial.setImagePath(joined);
    oldRawMaterial.setQuantity(rawMaterialRequest.getQuantity());
    oldRawMaterial.setUnitPrice(rawMaterialRequest.getUnitPrice());
    oldRawMaterial.setUnitType(rawMaterialRequest.getUnitType());
    oldRawMaterial.setUpdatedDate(new Date());
    this.rawMaterialRepository.save(oldRawMaterial);
  }

  public void updateRawMaterialsById(RawMaterial rawMaterial)
  {
    this.rawMaterialRepository.save(rawMaterial);
  }

  public void deleteRawMaterial(Long rawId)
  {
    this.rawMaterialRepository.deleteById(rawId);
  }

  public RawMaterialResponse getRawMaterialById(Long rawId)
  {
    Optional<RawMaterial> rawMaterial = this.rawMaterialRepository.findById(rawId);
    return this.getRawMaterialResponse((RawMaterial) rawMaterial.get());
  }

  public List<RawMaterialResponse> getRawMaterials()
  {
    List<RawMaterial> rawMaterial = new ArrayList();
    this.rawMaterialRepository.findAll().forEach((data) -> {
      rawMaterial.add(data);
    });
    return this.getRawMaterialResponses(rawMaterial);
  }

  private List<RawMaterialResponse> getRawMaterialResponses(List<RawMaterial> rawMaterial)
  {
    List<RawMaterialResponse> rawMaterialResponses = new ArrayList();
    rawMaterial.forEach((e) -> {
      RawMaterialResponse rawMaterialResponse = this.getRawMaterialResponse(e);
      rawMaterialResponses.add(rawMaterialResponse);
    });
    return rawMaterialResponses;
  }

  private RawMaterialResponse getRawMaterialResponse(RawMaterial rawMaterial)
  {
    double averageStars = 0;
    String[] imagePath = rawMaterial.getImagePath().split(",");

    if (!rawMaterial.getFeedBacks().isEmpty())
    {
      averageStars = rawMaterial.getFeedBacks().stream().mapToDouble(FeedBack::getFeedbackStars).sum() /
                     rawMaterial.getFeedBacks().size();
    }

    return new RawMaterialResponse(rawMaterial.getRawId(),
                                   rawMaterial.getRawMaterialName(),
                                   rawMaterial.getUnitPrice(),
                                   rawMaterial.getQuantity(),
                                   imagePath,
                                   rawMaterial.getCustomer().getCustomerId(),
                                   rawMaterial.getUnitType(),
                                   rawMaterial.getDescription(),
                                   averageStars);
  }

  public Page<RawMaterial> getRawMaterialsByNameAndRating(String name, boolean isOrderByRating, Pageable pageable)
  {
    if (name == null || name.isEmpty() && isOrderByRating)
    {
      return rawMaterialRepository.findAllByOrderByRatingDesc(pageable);
    }
    else if (!name.isEmpty() && isOrderByRating)
    {
      return rawMaterialRepository.findByRawMaterialNameLikeByOrderRatingDesc(name, pageable);
    }
    else
    {
      return rawMaterialRepository.findAllByRawMaterialNameIsContaining(name, pageable);
    }
  }


}
