@extends('adminlte::page')

@section('title', '分析')

@section('content_header')
    <h1>分析</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-12 col-md-6">
            <x-adminlte-card title="プロフィールへのアクセス">
                <canvas id="profile-chart"></canvas>
                <table class="table">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>訪問者数</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($profileAccesses as $accesses)
                            <tr>
                                <td>{{ $accesses->created_date }}</td>
                                <td>{{ $accesses->created_count }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </x-adminlte-card>
        </div>
        <div class="col-12 col-md-6">
            <x-adminlte-card title="リンクのアクセス">
                <canvas id="link-chart"></canvas>
                <table class="table">
                    <thead>
                    <tr>
                        <th>日付</th>
                        <th>訪問者数</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($linkAccesses as $accesses)
                        <tr>
                            <td>{{ $accesses->created_date }}</td>
                            <td>{{ $accesses->created_count }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </x-adminlte-card>
        </div>
    </div>
@stop

@section('css')
@stop

@section('js')
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js"></script>
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            new Chart(document.getElementById("profile-chart"), {
                type: "bar",
                data: {
                    labels: @php $profileLabels=[]; foreach($profileAccesses as $accesses){ $profileLabels[]=$accesses->created_date; } print(json_encode($profileLabels)); @endphp,
                    datasets: [{
                        label: "1日あたりの訪問者数",
                        data: @php $profileVisitors=[]; foreach($profileAccesses as $accesses){ $profileVisitors[]=$accesses->created_count; } print(json_encode($profileVisitors)); @endphp,
                    }],
                }
            });
            new Chart(document.getElementById("link-chart"), {
                type: "bar",
                data: {
                    labels: @php $linkLabels=[]; foreach($linkAccesses as $accesses){ $linkLabels[]=$accesses->created_date; } print(json_encode($linkLabels)); @endphp,
                    datasets: [{
                        label: "1日あたりの訪問者数",
                        data: @php $linkVisitors=[]; foreach($linkAccesses as $accesses){ $linkVisitors[]=$accesses->created_count; } print(json_encode($linkVisitors)); @endphp,
                    }],
                }
            });
        });
    </script>
@stop
