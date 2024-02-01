@extends('adminlte::page')

@section('title', 'お気に入り')

@section('content_header')
    <h1>お気に入り</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <div class="row">
        <div class="col-12">
            <x-adminlte-card>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-business-tab" data-toggle="tab" data-target="#nav-business" type="button" role="tab" aria-controls="nav-business" aria-selected="true">ビジネス</button>
                        <button class="nav-link" id="nav-private-tab" data-toggle="tab" data-target="#nav-private" type="button" role="tab" aria-controls="nav-private" aria-selected="false">プライベート</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-business" role="tabpanel" aria-labelledby="nav-business-tab">
                        <ul class="list-group">
                            @foreach($businessFavorites as $bf)
                                @if(App\Models\Block::where([['target_user_id', $bf->target_user()->id], ['user_id', auth()->id()]])->exists())
                                    @continue
                                @endif
                                <li class="list-group-item">
                                    <span>{{ $bf->target_user()->name }}</span>
                                    <div class="mt-2">
                                        <a class="btn btn-info" href="{{ route('app.profile', ['user_id' => $bf->target_user()->id]) }}">プロフィール</a>
                                        <a class="btn btn-primary" href="{{ route('app.dm', ['user_id' => $bf->target_user()->id]) }}">メッセージ</a>
                                        <form class="d-inline-block" action="{{ route('app.favorite.remove') }}" method="post">
                                            @csrf
                                            <input type="hidden" name="type" value="business">
                                            <input type="hidden" name="user_id" value="{{ $bf->target_user()->id }}">
                                            <button type="submit" class="btn btn-secondary">お気に入り削除</button>
                                        </form>
                                        <form class="d-inline-block" action="{{ route('app.block.add') }}" method="post">
                                            @csrf
                                            <input type="hidden" name="user_id" value="{{ $bf->target_user()->id }}">
                                            <button class="btn btn-danger">ブロック</button>
                                        </form>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="nav-private" role="tabpanel" aria-labelledby="nav-private-tab">
                        @foreach($privateFavorites as $pf)
                            @if(App\Models\Block::where([['target_user_id', $pf->target_user()->id], ['user_id', auth()->id()]])->exists())
                                @continue
                            @endif
                            <li class="list-group-item">
                                <span>{{ $pf->target_user()->name }}</span>
                                <div class="mt-2">
                                    <a class="btn btn-info" href="{{ route('app.profile', ['user_id' => $pf->target_user()->id]) }}">プロフィール</a>
                                    <a class="btn btn-primary" href="{{ route('app.dm', ['user_id' => $pf->target_user()->id]) }}">メッセージ</a>
                                    <form class="d-inline-block" action="{{ route('app.favorite.remove') }}" method="post">
                                        @csrf
                                        <input type="hidden" name="type" value="private">
                                        <input type="hidden" name="user_id" value="{{ $pf->target_user()->id }}">
                                        <button type="submit" class="btn btn-secondary">お気に入り削除</button>
                                    </form>
                                    <form class="d-inline-block" action="{{ route('app.block.add') }}" method="post">
                                        @csrf
                                        <input type="hidden" name="user_id" value="{{ $pf->target_user()->id }}">
                                        <button class="btn btn-danger">ブロック</button>
                                    </form>
                                </div>
                            </li>
                        @endforeach
                    </div>
                </div>
            </x-adminlte-card>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
@stop
