//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.grits.backend.model.Customer;
import io.grits.backend.model.RawMaterial;

@Repository
public interface RawMaterialRepository extends PagingAndSortingRepository<RawMaterial, Long>
{
  @Query("FROM RawMaterial WHERE customer_id = :customerId")
  List<RawMaterial> findByCustomerId(@Param("customerId") Long customerId);

  List<RawMaterial> findByCustomerAndRawMaterialNameIsContaining(Customer customer, String rawName);

  Page<RawMaterial> findAllByOrderByRatingDesc(Pageable pageable);

  @Query(value = "SELECT * FROM raw_material WHERE raw_material_name LIKE %:rawName% ORDER BY rating desc",
         countQuery = "SELECT count(raw_id) FROM raw_material WHERE raw_material_name LIKE %:rawName%",
         nativeQuery = true)
  Page<RawMaterial> findByRawMaterialNameLikeByOrderRatingDesc(@Param("rawName") String rawName, Pageable pageable);

  Page<RawMaterial> findAllByRawMaterialNameIsContaining(String rawName, Pageable pageable);
}
