<?php

namespace App\Http\Controllers;

use App\Models\FaqCategory;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $search = $request->query('search');

        $faq_categories = FaqCategory::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('faqs', function ($q) use ($search) {
                            $q->where('title', 'like', "%{$search}%")
                                ->orWhere('description', 'like', "%{$search}%");
                        });
                });
            })
            ->with(['faqs' => function ($query) use ($search) {
                if ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('title', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    });
                }
            }])
            ->get()
            ->map(function ($category) {
                $category->faqs = $category->faqs->values();

                return $category;
            })
            ->filter(function ($category) {
                return $category->faqs->isNotEmpty();
            })
            ->values();

        return inertia('faq', [
            'faq_categories' => $faq_categories,
            'search' => $request->query('search'),
        ]);
    }
}
