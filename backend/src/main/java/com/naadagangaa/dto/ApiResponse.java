package com.naadagangaa.dto;

public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;

    public ApiResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>("success", message, data);
    }

    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>("error", message, null);
    }

    public String getStatus() { return status; }
    public String getMessage() { return message; }
    public T getData() { return data; }
}