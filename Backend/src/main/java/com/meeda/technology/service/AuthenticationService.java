package com.meeda.technology.service;
import com.meeda.technology.dto.LoginUserDto;
import com.meeda.technology.dto.RegisterDto;
import com.meeda.technology.model.Role;
import com.meeda.technology.model.User;
import com.meeda.technology.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthenticationService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterDto registerDto) {

        User user = new User();

        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFirstname(registerDto.getFirstname());
        user.setLastname(registerDto.getLastname());
        user.setRole(Role.valueOf("ADMIN"));
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto loginUserDto) {
        User user = userRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        /*if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }*/
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserDto.getEmail(),
                            loginUserDto.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return user;
    }

}
