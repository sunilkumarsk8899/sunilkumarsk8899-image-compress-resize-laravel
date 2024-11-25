<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    public function index()
    {
        return view('image-compression');
    }

    public function compress(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
            'width' => 'nullable|integer',
            'height' => 'nullable|integer',
        ]);

        $image = $request->file('image');
        $width = $request->input('width');
        $height = $request->input('height');



    //     $fileName = 'compressed_' . time() . '.jpg';

    //     // Return the image as a downloadable file
    //     return response($resizedImage->stream('jpg'))
    //         ->header('Content-Type', 'image/jpeg')
    //         ->header('Content-Disposition', 'attachment; filename="' . $fileName . '"');
    }
}
