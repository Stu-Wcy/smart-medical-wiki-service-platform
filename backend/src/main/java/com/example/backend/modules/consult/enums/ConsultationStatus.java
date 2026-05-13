package com.example.backend.modules.consult.enums;

public enum ConsultationStatus {
    PENDING(1),
    REPLIED(2),
    EVALUATED(3),
    CLOSED(4);
    private final int value;
    ConsultationStatus(int v){ this.value = v; }
    public int getValue(){ return value; }
    public static ConsultationStatus from(Integer v){
        if (v == null) return null;
        for (ConsultationStatus s: values()){
            if (s.value == v) return s;
        }
        return null;
    }
}
