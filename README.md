# Simple RMM Client (Third Iteration) 

This is an alternative implementation for <https://github.com/mhaji007/devices-clientapp>. A system that partially mimics a simple RMM client. This version utilizes Material-UI for a more native look. The app is now responsive and supports better error handling/display for input fields.

## Application Architecture
This application is built using ReactJS. Each screen is divided into separate JS components.

### Styling
Material-UI is used for all basic components.

### React Router
React router v6 is used to create the following routes:

* /  ==> (Home, displays list of all devices)

The current implementation, much like the second iteration, makes use of modals and displays devices in a paginated table.

### Other npm modules
*	axios
*	react-multi-select-component (replaced with MUI autocomplete with chips)
*	react-icons (replaced with MUI icons)
*	react-modal (replaced with MUI modal)
*	react-paginate

## Installation
⚠️ 
Please download or clone the following repository in order to use the server for this client app before you proceed. <https://github.com/NinjaMSP/devicesTask_serverApp>
⚠️

1.	Extract the devices-clientapp-v3-main.zip file.  
2.	Open the terminal and navigate to devices-clientapp project directory by entering the following command


```bash
cd devices-clientapp-v3-main
```
3.	Run the following command to install dependencies 

```bash
npm install 
```

To run the application: 

1.	Open the terminal and navigate to devices-clientapp project directory 
```bash
cd devices-clientapp-v3-main
```
2.	Run the following command to spin up the server
```bash
npm start 
```

## Screenshots
![Add Modal](https://user-images.githubusercontent.com/22078200/142036800-4009cab4-bee4-4f01-86c8-14b00c6c0629.PNG)
![Delete Modal](https://user-images.githubusercontent.com/22078200/142036830-8ef6c3b6-fe73-408c-9cc4-2ea5740d519c.PNG)
![Sort](https://user-images.githubusercontent.com/22078200/142036923-8b04b036-cf2e-48ee-aa92-7a1702f33f15.PNG)

## To Do
* Add unit/integration tests
* Add loading indicators

## Contributing
Pull requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
