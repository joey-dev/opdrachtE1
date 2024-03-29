<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware' => 'auth'], function ()
{
    Route::get('/logoutLink', 'GetRequestController@logoutLink');
    Route::resource('/', 'IndexController');
    Route::post('/chart', 'IndexController@chart')->name('chart.create');
    Route::get('/chartDelete/{id}', 'IndexController@chartDelete')->name('chart.delete');
    Route::resource('/profile', 'ProfileController');
    Route::resource('/assignments', 'AssignmentsController');
    Route::resource('/classes', 'ClassesController');
    Route::resource('/groupe', 'GroupesController');
    Route::resource('/student', 'StudentsController');
    Route::get('/student/{id}/detail', 'StudentsController@detail')->name('student.detail');
    Route::get('/createCard', function () {
        return view('createCard');
    });

    Route::get('/classe/searchName', 'ClassesController@searchName')->name('classes.searchName');

    Route::get('/groupe/deleteStudent/{id}', 'GroupesController@deleteStudent')->name('groupe.deleteStudent');
    Route::get('/searchStudent/{name}', 'StudentsController@searchStudent')->name('student.search');
    Route::get('/searchStudentById/{id}', 'StudentsController@searchStudentById')->name('studentId.search');
    Route::post('/groupe/addStudentToGroupe', 'GroupesController@addStudentToGroupe')->name('groupe.addStudentToGroupe');
    Route::post('/groupe/createGroupe', 'GroupesController@createGroupe')->name('groupe.createGroupe');
});
