//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GritsFileNotFoundException extends RuntimeException
{
  public GritsFileNotFoundException(String message)
  {
    super(message);
  }

  public GritsFileNotFoundException(String message, Throwable exception)
  {
    super(message, exception);
  }
}
