package com.meeda.technology.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginResponseDto {
    private String token;
    private long expiresIn;

    public LoginResponseDto(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
