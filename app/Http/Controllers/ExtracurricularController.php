<?php

namespace App\Http\Controllers;

use App\Models\Extracurricular;
use Illuminate\Http\Request;

class ExtracurricularController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $extracurriculars = Extracurricular::with('extracurricular_category');

        $extracurriculars->where('is_active', true);

        return inertia('extracurriculars/index', [
            'extracurriculars' => $extracurriculars->latest()->get(),
            'seo' => [
                'title' => 'Ekstrakulikuler',
                'description' => 'Temukan komunitas yang mendukung hobi dan kreativitasmu di sekolah dengan cara yang menyenangkan.',
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Extracurricular $extracurricular)
    {
        if (! $extracurricular->is_active) {
            abort(404);
        }

        $extracurricular->load('extracurricular_category');

        return inertia('extracurriculars/show', [
            'extracurricular' => $extracurricular,
            'seo' => [
                'title' => $extracurricular->name,
                'description' => '-',
            ],
        ]);
    }
}
