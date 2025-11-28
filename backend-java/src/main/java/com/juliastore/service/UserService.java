package com.juliastore.service;

import com.juliastore.dto.*;
import com.juliastore.entity.User;
import com.juliastore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        // Verifica se o email já existe
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email já cadastrado");
        }

        // Cria novo usuário
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase().trim());
        // Criptografa a senha antes de salvar
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        // Gera um token simples (UUID)
        String token = UUID.randomUUID().toString();
        UserResponse userResponse = new UserResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail()
        );

        return new AuthResponse(true, "Usuário cadastrado com sucesso", token, userResponse);
    }

    public AuthResponse login(LoginRequest request) {
        // Busca o usuário pelo email
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail().toLowerCase().trim());

        if (userOptional.isEmpty()) {
            return new AuthResponse(false, "Email ou senha incorretos");
        }

        User user = userOptional.get();

        // Verifica se a senha está correta
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Email ou senha incorretos");
        }

        // Gera token e retorna dados do usuário
        String token = UUID.randomUUID().toString();
        UserResponse userResponse = new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail()
        );

        return new AuthResponse(true, "Login realizado com sucesso", token, userResponse);
    }

    public AuthResponse resetPassword(ResetPasswordRequest request) {
        // Busca o usuário
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail().toLowerCase().trim());

        if (userOptional.isEmpty()) {
            return new AuthResponse(false, "Usuário não encontrado");
        }

        // Atualiza a senha (criptografada)
        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return new AuthResponse(true, "Senha atualizada com sucesso");
    }

    public UserResponse getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email.toLowerCase().trim());

        if (userOptional.isEmpty()) {
            return null;
        }

        User user = userOptional.get();
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}

