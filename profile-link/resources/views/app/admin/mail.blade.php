@extends('adminlte::page')

@section('title', '一斉送信')

@section('content_header')
    <h1>一斉送信</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-12">
            <x-adminlte-card title="ユーザー">
                <form action="{{ route('app.admin.mail') }}" method="post">
                    @csrf
                    <label for="subject">用件</label>
                    <input type="text" class="form-control" id="subject" name="subject">
                    <label for="contents">内容</label>
                    <textarea class="form-control" id="contents" name="contents" rows="5"></textarea>
                    <button type="submit" class="btn btn-primary mt-2">送信</button>
                </form>
            </x-adminlte-card>
        </div>
        <div class="col-12">
          <x-adminlte-card title="送信履歴">
            <table class="table">
              <thead>
                <tr>
                  <th>日時</th>
                  <th>用件</th>
                </tr>
              </thead>
              <tbody>
                @foreach($mailHistories as $mailHistory)
                <tr>
                  <td>{{ $mailHistory->created_at }}</td>
                  <td>{{ $mailHistory->subject }}</td>
                </tr>
                @endforeach
              </tbody>
            </table>
            {{ $mailHistories->links() }}
          </x-adminlte-card>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
  <script src="https://cdn.jsdelivr.net/npm/tinymce@6.5.1/tinymce.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/tinymce-i18n@23.7.3/langs/ja.min.js"></script>
  <script>
    (() => {
      let editorId = "contents";

      function editorChangeHandler(inst) {
          console.log(inst);
          document.getElementById(editorId).value = tinymce.get(editorId).getContent();
      }

      tinymce.init({
        selector: `#${editorId}`,
        language: "ja",
        plugins: "image link",
        setup: editor => {
          editor.on("change", event => {
            document.getElementById(editorId).value = tinymce.get(editorId).getContent();
          });
        },
      });
    })();
  </script>
@stop
