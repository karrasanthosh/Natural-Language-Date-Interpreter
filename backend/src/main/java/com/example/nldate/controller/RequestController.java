package com.example.nldate.controller;

import com.example.nldate.model.RequestEntity;
import com.example.nldate.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RequestController {
    @Autowired
    private RequestRepository requestRepository;

    @PostMapping("/interpret")
    public ResponseEntity<?> interpret(@RequestBody Map<String, String> payload) {
        String requestText = payload.get("request");
        if (requestText == null || requestText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Request text is required"));
        }
        // Simulate Copilot API call (replace with real Copilot API integration)
        String jsonResponse = simulateCopilotApi(requestText);
        RequestEntity entity = new RequestEntity();
        entity.setRequestText(requestText);
        entity.setResponseJson(jsonResponse);
        requestRepository.save(entity);
        return ResponseEntity.ok(Map.of("request", requestText, "response", jsonResponse));
    }

    @GetMapping("/history")
    public List<Map<String, Object>> history() {
        return requestRepository.findAll().stream()
                .map(e -> new java.util.HashMap<String, Object>() {{
                    put("id", e.getId());
                    put("request", e.getRequestText());
                    put("response", e.getResponseJson());
                    put("createdAt", e.getCreatedAt());
                }})
                .collect(java.util.stream.Collectors.toList());
    }

    // Replace this with actual Copilot API integration
    private String simulateCopilotApi(String request) {
        if (request.toLowerCase().contains("monday")) {
            return "{\"date\":\"2025-03-25\",\"request\":\"" + request + "\"}";
        } else if (request.toLowerCase().contains("headphone")) {
            return "{\"product_name\":\"Wireless Noise-Cancelling Headphones\",\"key_features\":[\"Active noise cancellation\",\"20-hour battery life\",\"Comfortable ear cups\"],\"technical_specs\":{\"connectivity\":\"Wireless\",\"battery\":\"20 hours\",\"design\":\"Over-ear\"},\"original_request\":\"" + request + "\"}";
        }
        return "{\"request\":\"" + request + "\",\"response\":\"Simulated Copilot response\"}";
    }
}
