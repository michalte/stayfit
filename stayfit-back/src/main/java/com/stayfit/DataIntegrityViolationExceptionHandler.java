package com.stayfit;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ControllerAdvice
public class DataIntegrityViolationExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public DataIntegrityViolationExceptionHandler.Error handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return new DataIntegrityViolationExceptionHandler.Error(HttpStatus.BAD_REQUEST, LocalDateTime.now().toString(), "Użytkownik już istnieje");
    }

    public static class Error{
        private int errorCode;
        private String error;
        private String time;
        private String message;

        public Error(HttpStatus status,String time, String message) {
            this.errorCode = status.value();
            this.error = status.name();
            this.time = time;
            this.message = message;

        }

        public int getErrorCode() {
            return errorCode;
        }

        public void setErrorCode(int errorCode) {
            this.errorCode = errorCode;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        @Override
        public String toString() {
            return "Error{" +
                    "errorCode=" + errorCode +
                    ", error='" + error + '\'' +
                    ", time='" + time + '\'' +
                    ", message='" + message + '\'' +
                    '}';
        }
    }
}


