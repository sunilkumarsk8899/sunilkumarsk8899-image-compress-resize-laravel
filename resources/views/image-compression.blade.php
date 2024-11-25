@extends('layouts.app')

@section('content')
    <!-- Include CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">



    <div class="wrapper">
      <div class="upload-box">
        <input type="file" accept="image/*" hidden multiple >
        <img src="{{ Storage::url('images/upload-icon.svg'); }}" alt="">
        <p>Browse File to Upload  </p>
      </div>
      <div class="content">
        <div class="row sizes">
          <div class="column width">
            <label>Width</label>
            <input type="number">
          </div>
          <div class="column height">
            <label>Height</label>
            <input type="number">
          </div>
        </div>
        <div class="row checkboxes">
          <div class="column ratio text-center" >
            <input type="checkbox" id="ratio" style="margin-top: 5px;" checked>
            <label for="ratio">Lock aspect ratio</label>
          </div>
          <div class="column quality">
            <input type="checkbox" id="quality">
            <label for="quality">Reduce quality</label>
          </div>
        </div>
        <button class="download-btn">Download Image</button>
      </div>



    </div>

    <div class="row m-0">
        <div class="col">
            <div class="img-cards" style="">
            </div>
        </div>
    </div>



    <!-- Include JS -->
    <script src="{{ asset('js/script.js') }}"></script>

    @endsection


