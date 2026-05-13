package com.example.backend.common.constant;

public interface RegexConstant {
    
    String PHONE = "^1[3-9]\\d{9}$";
    
    String EMAIL = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
    
    String USERNAME = "^[a-zA-Z0-9_-]{4,16}$";
    
    String PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,16}$";
    
    String ID_CARD = "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)";
} 