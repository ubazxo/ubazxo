package com.meeda.technology.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUserDto {
    private String email;
    private String password;
}