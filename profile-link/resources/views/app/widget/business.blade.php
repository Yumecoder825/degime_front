<div class="my-5">
    <a class="btn btn-block btn-primary" href="{{ route('app.profile.vcard', ['user_id' => $userId]) }}">連絡先をダウンロード</a>
    @if(property_exists($data, 'company') && !empty($data->company))
        <h3>{{ $data->company }}</h3>
    @endif
    @if(property_exists($data, 'role') && !empty($data->role))
        <div class="text-muted">{{ $data->role }}</div>
    @endif
    @if(property_exists($data, 'name') && !empty($data->name))
        <h2 class="mt-2">{{ $data->name }}</h2>
    @endif
    @if(property_exists($data, 'address') && !empty($data->address))
        <address>{{ $data->address }}</address>
    @endif
    <div>
        @if(property_exists($data, 'phone') && !empty($data->phone))
            <a href="tel:{{ $data->phone }}"><i class="fas fa-fw fa-phone"></i>{{ $data->phone }}</a>
        @endif
        @if(property_exists($data, 'url') && !empty($data->url))
            <a href="{{ $data->url }}"><i class="fas fa-fw fa-link"></i>{{ $data->url }}</a>
        @endif
        @if(property_exists($data, 'email') && !empty($data->email))
            <a href="mailto:{{ $data->email }}"><i class="fas fa-fw fa-envelope"></i>{{ $data->email }}</a>
        @endif
    </div>
    @if(property_exists($data, 'other') && !empty($data->other))
        <div class="mt-2">{{ str_replace(["\n", "\r\n"], ['<br>', '<br>'], $data->other) }}</div>
    @endif
</div>
