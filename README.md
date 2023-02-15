<p align="center">
    <a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="500" alt="Laravel Logo"></a>
<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="150" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a> </p>

## About this project

This project aims to show the integration of the project in VUE JS Framework with Laravel PHP Framework in its latest versions.
As an example, the project learned in the Alura vue course, the alura tracker, will be used.

## How to use this project
 
###  * Open 4 prompt commands to stay execution on the using:

###  * Prompt 1 - Run commands bellow, first: to install all packages for laravel, second: migrate tables into your database, third: create a app key, fourth: create laravel passport api key and fiveth: install vue and other js packages(administration permissions is recommended)
```composer install```
,
```npm install```

###  * Configure ```.env``` file with database conection and vite api parameters

###  * Run below
```php artisan migrate```
,
```php artisan key:generate```
,
```php artisan passport:keys```
,
###  * Run below again and set the ```.env``` params ```VITE_CLIENT_ID``` and ```VITE_CLIENT_SECRET```
```php artisan passport:client --password``` 


### * Prompt 2 - Run command bellow to start laravel server (keep opened)
```php artisan serve```
### * Prompt 3 - Run command bellow to start vitejs to compile that vue project (keep opened)
```npm run dev```
### * Prompt 4 - Run command bellow to start json-serve faker api (keep opened)
```npm run api```

