@if(property_exists($data, 'image'))
<div class="my-3">
    @if(property_exists($data, 'url'))
    <a href="{{ $data->url }}"><img src="{{ $data->image }}" class="img-fluid"></a>
    @else
    <img src="{{ $data->image }}" class="img-fluid">
    @endif
    @if(property_exists($data, 'label'))
    <h6>{{ $data->label }}</h6>
    @endif
    @if(property_exists($data, 'desc'))
    <p>{{ $data->desc }}</p>
    @endif
</div>
@endif
