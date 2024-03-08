@if(property_exists($data, 'src'))
<iframe src="{{ $data->src }}"></iframe>
@endif
