@extends('adminlte::page')

@section('title', 'ホーム')

@section('content_header')
    <h1>ホーム</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-12">
            <x-adminlte-card title="ユーザー">
                <canvas id="user-chart"></canvas>
                <table class="table">
                    <thead>
                    <tr>
                        <th>日付</th>
                        <th>登録者数</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>{{ $user->created_date }}</td>
                            <td>{{ $user->created_count }}</td>
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
            new Chart(document.getElementById("user-chart"), {
                type: "bar",
                data: {
                    labels: @php $userLabels=[]; foreach($users as $accesses){ $userLabels[]=$accesses->created_date; } print(json_encode($userLabels)); @endphp,
                    datasets: [{
                        label: "1日あたりの登録者数",
                        data: @php $userRegisters=[]; foreach($users as $accesses){ $userRegisters[]=$accesses->created_count; } print(json_encode($userRegisters)); @endphp,
                    }],
                }
            });
        });
    </script>
@stop
