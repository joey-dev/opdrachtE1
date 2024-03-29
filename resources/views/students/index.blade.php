@extends('layouts.index')

@section('javascript')
    <script src="{{asset('js/student.js')}}"></script>
@endsection

@section('css')
    <link href="{{asset('css/card.css')}}" rel="stylesheet">
@endsection


@section('content')

<div class="row">
  <div class="col card">
    <div class="card">
      <div class="card-header">
        Studenten
        <form class="form-inline my-2 my-lg-0 searchArea">
         <input class="form-control mr-sm-2" type="search" id="searchStudent" placeholder="Zoek een student..." aria-label="searchStudent" value="{{$studentSearch}}"/>
         <a href="#" class="searchButton"><img src="{{ asset('images/header/searchButton.png') }}"></a>
       </form>
      </div>
      <div class="card-body">
        <table class="table table-striped center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naam</th>
              <th scope="col">Klas</th>
              <th scope="col">Bezig met een opdracht</th>
              <th scope="col">Aantal gemaakte opdrachten</th>
              <th scope="col">Eindcijfer</th>
              <th scope="col">Voortgang</th>
              <th scope="col">Acties</th>
            </tr>
          </thead>
          <tbody id="searchStudents">

          </tbody>
        </table>
        <button class="btn btn-primary" onclick="window.location='{{route('student.create')}}';">Maak een student aan</button>
      </div>
    </div>
  </div>
</div>

<table class="table table-striped" style="display: none;">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Naam</th>
        <th scope="col">Klas</th>
        <th scope="col">Bezig met een opdracht</th>
        <th scope="col">Aantal gemaakte opdrachten</th>
        <th scope="col">Eindcijfer</th>
        <th scope="col">Voortgang</th>
        <th scope="col">Acties</th>
    </tr>
    </thead>
    <tbody id="secretAllData">
    @php($studentNumber = 0)
        @foreach($students as $student)
            @php($studentNumber++)
            @php($totalAssignmentsDone = 0)
            @php($endGrade = 0)
            @php($grade = 0)
            @php((isset($student->classe[0]->name) ? $class = $student->classe[0]->name : $class = "niet in een klas"))
            @foreach($student->groupe as $groupe)
                @if ($groupe->grade == 0)
                    @php($doingAssignment = "ja")
                @else
                    @php($grade = $grade+$groupe->grade)
                    @php($totalAssignmentsDone++)
                    @php($doingAssignment = "nee")
                @endif
            @endforeach
            @if ($totalAssignmentsDone > 0)
                @php($endGrade = $grade/$totalAssignmentsDone)
            @endif

            <tr>
                <th scope="row" class="studentNumber">{{$studentNumber}}</th>
                <td>{{$student->name}} {{$student->insertion}} {{$student->last_name}}</td>
                <td>{{$class}}</td>
                <td>{{$doingAssignment}}</td>
                <td>{{$totalAssignmentsDone}}</td>
                <td class="grade" id="studentEndGrade{{$studentNumber}}">{{$endGrade}}</td>
                <td></td>
                <td><svg class="tableBtn" onclick="window.location='{{route('student.detail', $student->id)}}'" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M9,15 L11,15 L11,9 L9,9 L9,15 L9,15 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z M9,7 L11,7 L11,5 L9,5 L9,7 L9,7 Z" id="Shape"/></svg><svg class="tableBtn" onclick="window.location='{{route('student.edit', $student->id)}}'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 20 18" style="enable-background:new 0 0 20 18;" xml:space="preserve"><path id="Shape" d="M1,14.2V18h3.8l11-11.1L12,3.1L1,14.2z M18.7,4c0.4-0.4,0.4-1,0-1.4l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0l-1.8,1.8 L17,5.9L18.7,4z"/></svg>
                    {!! Form::open(['method'=>'DELETE', 'action'=>['StudentsController@destroy', $student->id], 'class' => '', 'id' => 'form'.$student->id]) !!}
                    <svg class="tableBtn delete" onclick="document.getElementById('form{{$student->id}}').submit()" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z"/><path d="M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z" id="XMLID_2_"/><path d="M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z" id="XMLID_1_"/></g></svg>
                    {!! Form::close() !!}
                </td>
            </tr>
        @endforeach
    </tbody>
</table>


@endsection

@section('lateScripts')
    <script src="{{asset('js/grade.js')}}"></script>
@endsection
