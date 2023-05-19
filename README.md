To create this project I used this stack : 

- JS,
- SCSS,
- Typescript,
- React
- React-redux
- Redux Toolkit
- React-pagination
- React-router
- React-loader (to create skeletons before loading the main content)
- Axios
- QS (query parser from url string)
- clsx (a small library to make working with classes easier)
- lodash.debounce (a small sub-library from lodash to create pending actions )
Starting and Compiling a Project : 

Download the git repository to your computer : 
```
git clone https://github.com/valdemarus21/pizza-shop.git
```
go to the project folder : 
```
cd pizza-proj
```
install the dependencies : 
```
sudo npm install
```
start the project : 
```
sudo npm start 
```
The project is already built with sudo npm run build, but you can see the development history, folder structure and so on ))
Also, for a lighterweight final project bundle, I used React.lazy to break the final bundle into chunks to be loaded 
