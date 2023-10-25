@extends('adminlte::page')

@section('title', 'メッセージ')

@section('content_header')
    <h1>メッセージ</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-12">
            <x-adminlte-card>
                <div class="list-group">
                    @foreach($users as $user)
                        <a href="{{ route('app.dm', ['user_id' => $user->id]) }}" class="list-group-item list-group-item-action">{{ $user->name }}</a>
                    @endforeach
                </div>
            </x-adminlte-card>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
@stop
