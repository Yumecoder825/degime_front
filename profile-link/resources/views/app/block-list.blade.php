@extends('adminlte::page')

@section('title', 'ブロック')

@section('content_header')
    <h1>ブロック</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <div class="row">
        <ul class="col-12">
            <x-adminlte-card>
                <ul class="list-group">
                    @foreach($blocks as $block)
                        <li class="list-group-item">
                            <span>{{ $block->target_user()->name }}</span>
                            <div class="mt-2">
                                <form class="d-inline-block" action="{{ route('app.block.remove') }}" method="post">
                                    @csrf
                                    <input type="hidden" name="user_id" value="{{ $block->target_user()->id }}">
                                    <button class="btn btn-secondary">ブロック解除</button>
                                </form>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </x-adminlte-card>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
@stop
