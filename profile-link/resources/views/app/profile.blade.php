<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ $user->name }}さんのプロフィール</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    @if($user->getMeta('bgImage'))
    <style>
        body {
            background-image: url("{{ $user->getMeta('bgImage') }}");
        }
    </style>
    @elseif($user->getMeta('bgColor'))
    <style>
        body {
            background-color: {{ $user->getMeta('bgColor') }}!important;
        }
    </style>
    @endif
</head>
<body style="min-height: 100vh;">
    <main class="container py-5 text-center">
        @if(session('message'))
            <x-adminlte-alert theme="info" dismissable>
                {{ session('message') }}
            </x-adminlte-alert>
        @endif
        <img src="{{ asset('img/' . $user->avatar) }}" class="rounded-circle" style="width: 15rem; height: 15rem; max-width: 100%; max-height: 100%; object-fit: cover;">
        <h1>{{ $user->name }}</h1>
        <div>
            <div class="dropdown d-inline-block">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    お気に入りに追加
                </button>
                <div class="dropdown-menu">
                    <form action="{{ route('app.favorite.add') }}" method="post">
                        @csrf
                        <input type="hidden" name="user_id" value="{{ $user->id }}">
                        <input type="hidden" name="type" value="business">
                        <button type="submit" class="dropdown-item">ビジネス</button>
                    </form>
                    <form action="{{ route('app.favorite.add') }}" method="post">
                        @csrf
                        <input type="hidden" name="user_id" value="{{ $user->id }}">
                        <input type="hidden" name="type" value="private">
                        <button type="submit" class="dropdown-item">プライベート</button>
                    </form>
                </div>
            </div>
            <form class="d-inline-block" action="{{ route('app.block.add') }}" method="post">
                @csrf
                <input type="hidden" name="user_id" value="{{ $user->id }}">
                <button type="submit" class="btn btn-danger">ブロックする</button>
            </form>
        </div>
        @if(is_array($profile))
        @foreach($profile as $widget)
            @if(property_exists($widget, 'type'))
                @if($widget->type == 'business')
                    @component('app.widget.business', ['data' => $widget, 'userId' => $user->id])
                    @endcomponent
                @endif
                @if($widget->type == 'reserve')
                    @component('app.widget.reserve', ['data' => $widget])
                    @endcomponent
                @endif
                @if($widget->type == 'map')
                    @component('app.widget.map', ['data' => $widget])
                    @endcomponent
                @endif
                @if($widget->type == 'link')
                    @component('app.widget.link', ['data' => $widget, 'userId' => $user->id])
                    @endcomponent
                @endif
                @if($widget->type == 'image')
                    @component('app.widget.image', ['data' => $widget])
                    @endcomponent
                @endif
                @if($widget->type == 'embed')
                    @component('app.widget.embed', ['data' => $widget])
                    @endcomponent
                @endif
            @endif
        @endforeach
        @endif
    </main>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
