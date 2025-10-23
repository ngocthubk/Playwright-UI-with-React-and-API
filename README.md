 ## Playwright-UI-with-React-and-API
 ### Objective
This project aims to experiment with UI and API testing for React web applications with Playwright. Therefore, it focuses on a variety of techniques like React components, Mock API, Fixtures, isolating test data... and so on, NOT on covering the behaviours and functions. The requirements are unknown.

<p> The project also demonstrates a varierty of skills including organizing tests, test data for different environments and combining UI Test and API Tests... and so on. </p>
 
 ### URL
 https://practice.expandtesting.com/notes
 ### Test data
 Depending on the environment, the data can be read either from an API call or a local JSON file.
### How to view the test result in Github
1. Go to the tab Actions,
   
2. Click on a workflow run you want to view,
   
3. Click on "test" to view the test results of this run.
### How to run the test locally:
1. Clone the project to the local machine.
2. Copy the file .env.sample to .env.
3. Open the file .env
 
	3.1 Replace the values #yourEmail# and #yourPassword#, #authToken# with your email, password and authenticate token on Notes App respectively.   
 3.2 (Optional) replace the values #stageORdev# with 'stage' or 'dev', when you want to run the tests with the corresponding test data as following:
   - dev: the tests will read data from a local JSON file
   - stage: the tests will read data from an API call
   <p> This is just an option for the extension in the future, in case if the application can be deployed in the different environments like stage or dev, so the tests should run with the corresponding test data.
   </p>
5. Run the test with the standard command: npx playwright test
 ### Author:
<p> Name: Thu Nguyen
</p>
<p>
Email: ngocthubk@gmail.com
</p>





