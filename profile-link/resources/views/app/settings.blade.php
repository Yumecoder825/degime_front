@extends('adminlte::page')

@section('title', '設定')

@section('content_header')
    <h1>設定</h1>
@stop

@section('content')
    @if(session('message'))
        <x-adminlte-alert theme="info" dismissable>
            {{ session('message') }}
        </x-adminlte-alert>
    @endif
    <x-adminlte-card>
        <form action="{{ route('app.settings') }}" method="post">
            @csrf
            <x-adminlte-input name="id" label="ID" value="{{ $user->id }}" disabled/>
            <x-adminlte-input name="id" label="プロフィールURL" value="{{ route('app.r', [
                'url' => str_replace('https://is.gd/', '', json_decode(
                    file_get_contents('https://is.gd/create.php?format=json&url='.route('app.profile', ['user_id' => $user->id]))
                )->shorturl)
                ]) }}" disabled/>
            <button type="button" class="btn btn-primary mb-2" id="write-nfc">NFCに書き込み</button>
            <x-adminlte-input name="name" label="名前" value="{{ $user->name }}" />
            <x-adminlte-input name="avatar" type="file" label="アバター" />
            <x-adminlte-input name="email" type="email" label="メールアドレス" value="{{ $user->email }}" />
            <x-adminlte-button label="更新" type="submit" />
        </form>
    </x-adminlte-card>
@stop

@section('css')
@stop

@section('js')
    <script>
        (() => {
            function write(data) {
                ignoreRead = true;
                return new Promise((resolve, reject) => {
                    ndef.addEventListener("reading", event => {
                    ndef.write(data).then(resolve, reject).finally(() => ignoreRead = false);
                    }, { once: true });
                });
            }

            document.getElementById("write-nfc").addEventListener("click", () => {
                if(window.NDEFReader == undefined) {
                    alert("お使いの端末、ブラウザはNFCタグの書込みに対応していません");
                    return;
                }

                (async () => {
                    const ndef = new NDEFReader();
                    await ndef.scan();
                    try {
                        await write("{{ route('app.profile', ['user_id' => $user->id]) }}");
                        alert("NFCタグの書込みました");
                    } catch(err) {
                        alert("NFCタグの書込目ませんでした:" + err);
                    }
                })();
            });
        })();
    </script>
@stop
