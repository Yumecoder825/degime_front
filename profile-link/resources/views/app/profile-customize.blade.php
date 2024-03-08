@extends('adminlte::page')

@section('title', 'カスタマイズ')

@section('content_header')
    <h1>カスタマイズ</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <div class="row">
        <div class="col-12">
            <div class="alert alert-info">プレビューは<a href="{{ route('app.profile', ['user_id' => $user->id]) }}">こちら</a>から確認できます</div>
        </div>
        <div class="col-12">
            <x-adminlte-card>
                <form action="{{ route('app.profile.customize') }}" method="post">
                    @csrf
                    <input type="hidden" id="widget-data" name="widget_data" value="{{ $profile->data }}">
                    <label for="bg_color">背景色</label>
                    <input type="color" class="form-control" id="bg_color" name="bg_color" value="{{ $user->getMeta('bgColor') }}">
                    <label for="bg_image_file">背景画像</label>
                    <input type="file" class="form-control" id="bg_image_file" value="{{ $user->getMeta('bgColor') }}">
                    <input type="hidden" id="bg_image" name="bg_image" value="{{ $user->getMeta('bgImage') }}">
                    <button type="submit" class="btn btn-primary btn-block mt-4">ページを保存</button>
                </form>
            </x-adminlte-card>
        </div>
        <div class="col-12">
            <div id="widget-editor">
                <div id="widget-area"></div>
                <div class="input-group mt-4">
                    <select class="custom-select" id="widget-add-item">
                        <option value="business">ビジネスウィジェット</option>
                        <option value="reserve">予約ウィジェット</option>
                        <option value="map">マップウィジェット</option>
                        <option value="link">リンクウィジェット</option>
                        <option value="image">画像ウィジェット</option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" id="widget-add">+追加</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
    <script src="https://maps.google.com/maps/api/js?sensor=false&libraries=places&key={{ config('app.google_maps_api_key') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-locationpicker@0.1.12/dist/locationpicker.jquery.min.js"></script>
    <script src="{{ asset('js/widget-editor.js') }}"></script>
    <script>window.WidgetEditor("#widget-data");</script>
    <script>
        document.getElementById("bg_image_file").addEventListener("select", () => {
            let fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                document.getElementById("bg_image").value = fileReader.result;
            });
            fileReader.readAsDataURL(document.getElementById("bg_image_file").files[0]);
        });
    </script>
@stop

