package com.meeda.technology.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RegisterDto {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
