package com.example.api.dummyapi;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    private String externalApiUrl = "https://dummyjson.com/users";

    public UserService(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }
    
    public List<User> fetchUsersFromExternalApi() {
        System.out.println("Fetching users from: " + externalApiUrl);

        ApiResponse response = restTemplate.getForObject(externalApiUrl, ApiResponse.class);

        if (response != null && response.getUsers() != null) {
            return response.getUsers();
        } else {
            System.out.println("No users found in API response.");
            return List.of();  // Return empty list if no users found
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public List<User> getUsersSortedByAge(Sort.Direction direction) {
        return userRepository.findAll(Sort.by(direction, "age"));
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserBySsn(String ssn) {
        return userRepository.findBySsn(ssn);
    }

	public List<String> getAllRoles() {
		List<User> allUser = userRepository.findAll();
		List<String> result = new ArrayList<>();
		for(User user: allUser) {
			result.add(user.getRole());
		}
		List<String> roles = result.stream()
									.distinct()
									.collect(Collectors.toList());
		return roles; 
	}
    
    @PostConstruct
    public void init() {
        String url = "https://dummyjson.com/users"; // Replace with your JSON URL
        try {
            ApiResponse response = restTemplate.getForObject(url, ApiResponse.class);
            if (response != null && response.getUsers() != null) {
                userRepository.saveAll(response.getUsers());
                System.out.println("✅ Data saved successfully!");
            }
        } catch (Exception e) {
            System.err.println("❌ Failed to fetch data: " + e.getMessage());
        }
    }


}
