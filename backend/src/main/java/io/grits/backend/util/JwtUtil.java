//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package io.grits.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtUtil
{
  private String secret = "gritsecret";

  public JwtUtil()
  {
  }

  public String extractUsername(String token)
  {
    return this.extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token)
  {
    return this.extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
  {
    Claims claims = this.extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token)
  {
    return Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token)
  {
    return this.extractExpiration(token).before(new Date());
  }

  public String generateToken(String username)
  {
    Map<String, Object> claims = new HashMap();
    return this.createToken(claims, username);
  }

  private String createToken(Map<String, Object> claims, String subject)
  {
    return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + 36000000L)).signWith(SignatureAlgorithm.HS256, this.secret)
      .compact();
  }

  public Boolean validateToken(String token, UserDetails userDetails)
  {
    String username = this.extractUsername(token);
    return username.equals(userDetails.getUsername()) && !this.isTokenExpired(token);
  }
}
