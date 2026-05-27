API Contract & Security Standard
    - Base URL: Defined by PUBLIC_API_URL
    - Auth Method: HttpOnly Cookies (Secure, SameSite=Strict)
    - Token Strategy: 
        - Access Token: Short-lived, delivered via HttpOnly cookie.
        - Refresh Token: Long-lived, delivered via HttpOnly cookie.
    - Response Wrapper: 
        { "success": boolean, "data": T, "message"?: string, "error"?: string }
    - Error Handling: Production mode must mask internal stack traces.
    - Payload: All mutating requests (POST, PUT, DELETE) must include an 'Origin' header validation.
    
