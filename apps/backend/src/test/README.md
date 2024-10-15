# Testing plan

1. Create a test login with firebase and get api key (similar to how we do for postman)
2. then test sample controller to see if it works
3. Then test the resume management controllers (create multiple resumes, get all the resumes, delete a couple of the resumes) **NOTE: we are saving the get history for later**
4. Then we test each and every single websocket instance, and make sure its working
5. then we initiate another websocket connection and then test those
6. Then we test the resume management controllers to see if that is working as well
7. Then create a node version of the testing and emulate it there as well