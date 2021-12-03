//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.grits.backend.model.RawMaterial;
import io.grits.backend.request.RawMaterialRequest;
import io.grits.backend.response.FilePath;
import io.grits.backend.response.RawMaterialResponse;
import io.grits.backend.service.FileStorageService;
import io.grits.backend.service.RawMaterialService;

@RestController
@RequestMapping({ "/api/rawmaterial" })
public class RawMaterialController
{
  @Autowired
  private FileStorageService fileStorageService;
  @Autowired
  private RawMaterialService rawMaterialService;

  public RawMaterialController()
  {
  }

  @PutMapping({ "/upload" })
  public ResponseEntity<FilePath> upload(@RequestParam("path") MultipartFile multipartFile)
  {
    String fileName = this.fileStorageService.storeFile(multipartFile);
    String path =
      ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/rawmaterial/").path(fileName).toUriString();
    return ResponseEntity.ok(new FilePath(path));
  }

  @GetMapping({ "/{fileName:.+}" })
  public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest httpServletRequest)
  {
    Resource resource = this.fileStorageService.loadFileAsResource(fileName);
    String contentType = null;

    try
    {
      contentType = httpServletRequest.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
    }
    catch (IOException var6)
    {
      System.out.println("Could not determine filetype !!!");
    }

    if (contentType == null)
    {
      contentType = "application/octet-stream";
    }

    return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
  }

  @PostMapping({ "/" })
  public ResponseEntity<String> saveData(@RequestBody RawMaterialRequest rawMaterialRequest)
  {
    try
    {
      this.rawMaterialService.saveRawMaterials(rawMaterialRequest);
    }
    catch (Exception var3)
    {
      return ResponseEntity.badRequest().body("Raw material not saved!! ");
    }

    return ResponseEntity.ok("Success: Successfully registered");
  }

  @GetMapping({ "/getRawMaterials" })
  public ResponseEntity<Page<RawMaterial>> getRawMaterials(Pageable pageable)
  {
    return ResponseEntity.ok(this.rawMaterialService.getRawMaterials(pageable));
  }

  @GetMapping({ "/getRawMaterialsByCustomerId" })
  public ResponseEntity<List<RawMaterialResponse>> getRawMaterialsByCustomerId(@RequestParam("customerId") Long customerId)
  {
    return ResponseEntity.ok(this.rawMaterialService.getRawMaterialsByCustomerId(customerId));
  }

  @GetMapping({ "/getAllRawMaterials" })
  public ResponseEntity<List<RawMaterialResponse>> getAllRawMaterials()
  {
    return ResponseEntity.ok(this.rawMaterialService.getRawMaterials());
  }

  @PutMapping({ "/update" })
  public ResponseEntity<String> updateData(@RequestBody RawMaterialRequest rawMaterialRequest)
  {
    try
    {
      this.rawMaterialService.updateRawMaterials(rawMaterialRequest);
    }
    catch (Exception var3)
    {
      return ResponseEntity.badRequest().body("Raw material not saved!! ");
    }

    return ResponseEntity.ok("Success: Successfully Updated");
  }

  @DeleteMapping({ "/deleteData" })
  public ResponseEntity<String> deleteRawMaterial(@RequestParam("id") Long id)
  {
    try
    {
      this.rawMaterialService.deleteRawMaterial(id);
    }
    catch (Exception var3)
    {
      return ResponseEntity.badRequest().body("Raw material unable to delete ");
    }

    return ResponseEntity.ok("Success: Successfully Deleted");
  }

  @GetMapping({ "/getRawDataById" })
  public ResponseEntity<RawMaterialResponse> getRawMaterialById(@RequestParam("id") Long id)
  {
    return ResponseEntity.ok(this.rawMaterialService.getRawMaterialById(id));
  }

//Desc
  @GetMapping({ "/getRawMaterialsByNameAndRating" })
  public ResponseEntity<Page<RawMaterial>> getRawMaterialsByNameAndRating(@RequestParam("name") String name,
                                                                          @RequestParam("rating") boolean isOrderByRating,
                                                                          Pageable pageable)
  {
    return ResponseEntity.ok(rawMaterialService.getRawMaterialsByNameAndRating(name, isOrderByRating, pageable));
  }
}
