# Token Authentication Debug Guide

This branch contains comprehensive logging to diagnose why protected endpoints are returning 401 Unauthorized.

## What Changed

### Backend (`backend/src/middleware/protectRoute.js`)
Added detailed console logging at each step of token validation:
- Check if Authorization header exists
- Verify JWT_SECRET is configured
- Extract token from Bearer header
- Attempt JWT verification
- Look up user in database
- Confirm successful authentication

### Frontend (`frontend/src/lib/axios.js`)
Simplified and added logging to the request interceptor:
- Log token retrieved from localStorage
- Log headers before and after adding Authorization
- Removed unreliable `config.headers.set()` method

## How to Debug

1. **Deploy this branch to Railway**
2. **Clear browser localStorage** (or open in private/incognito mode)
3. **Attempt to login** with valid credentials
4. **After login succeeds**, make a request to a protected endpoint like:
   - `/api/sessions/active`
   - `/api/sessions/my-recent`
   - `/api/auth/me`
5. **Check Railway deployment logs** in real-time

## What to Look For in the Logs

### Expected Successful Flow

When you access a protected endpoint with a valid token, you should see:

```
Axios Interceptor - Token from localStorage: eyJhbGciOiJIUzI1NiIs...
Axios Interceptor - Config headers before: {...}
Axios Interceptor - Config headers after: {...Authorization: Bearer eyJhbGciOiJIUzI1NiIs...}
🔐 protectRoute - Full auth header: Bearer eyJhbGciOiJIUzI1NiIs...
🔐 protectRoute - JWT_SECRET exists: true
🔐 protectRoute - JWT_SECRET length: 32
🔐 protectRoute - Extracted token (first 20 chars): eyJhbGciOiJIUzI1NiIs
✅ protectRoute - Token verified, userId: 507f1f77bcf86cd799439011
🔐 protectRoute - User lookup result: Found
✅ protectRoute - Auth successful for user: 507f1f77bcf86cd799439011
```

### Common Failure Scenarios

#### Scenario 1: Token Not Being Sent
```
Axios Interceptor - Token from localStorage: null
```
**Problem**: Token is not in localStorage. User logged out or login didn't save it.
**Fix**: Check browser's localStorage in DevTools → Application tab

#### Scenario 2: Missing Authorization Header at Backend
```
❌ protectRoute - No auth header provided
```
**Problem**: Frontend is not sending the Authorization header.
**Fix**: Check axios interceptor is working (look for "Axios Interceptor" logs above)

#### Scenario 3: Invalid Bearer Format
```
❌ protectRoute - Auth header doesn't start with Bearer: {whatever was sent}
```
**Problem**: Header format is wrong (not "Bearer {token}").
**Fix**: Verify axios interceptor is setting it correctly

#### Scenario 4: JWT Verification Failed
```
❌ protectRoute - JWT verification failed: {error message}
```
**Problem**: Could be:
- Token is malformed/corrupted
- Token expired (won't happen at 15d expiry right after login)
- JWT_SECRET mismatch (backend using different secret than when token was created)
**Fix**: 
- If "invalid signature": JWT_SECRET changed between login and request
- If "malformed": token got corrupted somewhere
- Clear localStorage and login again

#### Scenario 5: User Not Found in Database
```
✅ protectRoute - Token verified, userId: 507f1f77bcf86cd799439011
🔐 protectRoute - User lookup result: Not Found
❌ protectRoute - User not found for userId: 507f1f77bcf86cd799439011
```
**Problem**: Token is valid but user was deleted from database.
**Fix**: Create a new user account

#### Scenario 6: Unexpected Error
```
💥 protectRoute - Unexpected error: {error message}
💥 Stack: {stack trace}
```
**Problem**: Something unexpected happened (database connection error, etc).
**Fix**: Check the stack trace and error message

## Steps to Check

1. **In browser DevTools Console** (F12 → Console tab):
   - Look for "Axios Interceptor" logs
   - Confirm token is being retrieved and Authorization header is being set

2. **In Railway Deployment Logs** (Dashboard → your service → Deployment → Logs):
   - Look for "🔐" logs from protectRoute
   - Follow the emoji progression: 🔐 (info) → ✅ (success) or ❌ (failure)
   - The last emoji indicates where it broke

3. **Check Environment Variables**:
   - Ensure `JWT_SECRET` is set on the service
   - Ensure `CLIENT_URL` is correct (though this doesn't affect token auth)

## After Identifying the Issue

Once you see which log line appears last, let me know and I can provide the exact fix. Common fixes:
- Add missing environment variable
- Fix axios interceptor
- Update middleware logic
- Restart service to pick up env var changes

