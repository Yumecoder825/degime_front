@extends('adminlte::page')

@section('title', 'ユーザー管理')

@section('content_header')
    <h1>ユーザー管理</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <x-adminlte-card>
        <table class="table">
            <thead>
            <tr>
                <th scope="col" class="d-none d-md-table-cell">ID</th>
                <th scope="col">名前</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $user)
                <tr>
                    <td class="d-none d-md-table-cell">{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>
                        <a href="{{ route('app.profile', ['user_id' => $user->id]) }}" class="btn btn-info">プロフィール</a>
                        <a href="{{ route('app.dm', ['user_id' => $user->id]) }}" class="btn btn-primary">メッセージ</a>
                        <form class="d-inline-block" action="{{ route('app.admin.users') }}" method="post">
                            @csrf
                            <input type="hidden" name="user_id" value="{{ $user->id }}">
                            <button class="btn btn-danger">退会</button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{ $users->links() }}
    </x-adminlte-card>
@stop

@section('css')
@stop

@section('js')
@stop
