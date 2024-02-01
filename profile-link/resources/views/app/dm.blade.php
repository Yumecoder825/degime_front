@extends('adminlte::page')

@section('title', 'メッセージ')

@section('content_header')
    <h1>メッセージ</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <div class="row">
        <div class="col-12 mb-4">
            <form action="{{ route('app.dm', ['user_id' => $user_id]) }}" method="post">
                @csrf
                <textarea class="form-control mb-2" name="message" rows="5"></textarea>
                <input type="hidden" name="user_id" value="{{ $user_id }}">
                <button class="btn btn-primary btn-block">送信</button>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            @foreach($dms as $dm)
                <x-adminlte-card>
                    <h5 class="m-0">{{ $dm->from_user->name }}</h5>
                    <div class="text-muted" style="font-size: .8rem;">{{ $dm->created_at }}</div>
                    <p>{{ $dm->message }}</p>
                </x-adminlte-card>
            @endforeach
        </div>
        {{ $dms->links() }}
    </div>
@stop

@section('css')
@stop

@section('js')
@stop
