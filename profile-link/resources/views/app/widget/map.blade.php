@if(property_exists($data, 'lat') && property_exists($data, 'lon'))
<iframe src="https://maps.google.com/maps?output=embed&q={{ $data->lat }},{{ $data->lon }}" width="100%" height="250" frameborder="0" style="border: 0;" allowfullscreen=""></iframe>
@endif
