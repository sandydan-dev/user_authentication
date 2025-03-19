<!-- user authentication router -->
## Description

 - post request : http://localhost:5000/api/user/register
 - post request : http://localhost:5000/api/user/login  (rate-limiter)
 - post request : http://localhost:5000/api/user/logout
 - put  request : http://localhost:5000/api/user/update/(id)
 - get  request : http://localhost:5000/api/user/protected // protected route with jwt token
 - patch request : http://localhost:5000/api/user/forget-password/(id)   (rate-limiter)