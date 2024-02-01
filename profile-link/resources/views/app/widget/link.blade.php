@if(property_exists($data, 'label') && property_exists($data, 'url'))
<div class="card rounded-lg text-light bg-dark my-3">
    <div class="card-body" style="font-size: 1.2rem;">
        <i class="fas fa-fw fa-link"></i>
        <span>{{ $data->label }}</span>
        <a class="stretched-link" href="{{ route('app.redirect', ['url' => $data->url, 'user_id' => $userId]) }}"></a>
    </div>
</div>
@endif
