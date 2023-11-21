# tests/integration/post-fragments-unsupported-type.hurl

# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments

############## We're sending a unsupported type ##############
Content-Type: text/unsupported

# Include HTTP Basic Auth credentials
[BasicAuth]
user1@email.com:password1
# Body of the request goes in ```...``` when it's a string
`This is an unsupported Content-type fragment!`

# We should get back an HTTP 1.1 415 response
HTTP/1.1 415
