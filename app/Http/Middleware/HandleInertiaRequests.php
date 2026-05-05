<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'configurations' => [
                'spmb' => [
                    'open' => true,
                    'hero' => [
                        'badge' => 'Penerimaan Peserta Didik Baru 2025/2026 Telah Dibuka!',
                        'button' => 'Yuk, Daftar Sekarang!',
                    ],
                    'cta' => [
                        'badge' => 'Tahun Ajaran 2025/2026',
                        'heading' => 'Penerimaan Peserta Didik Baru',
                        'body' => 'Daftarkan dirimu dan raih masa depan cerah bersama SMAS PGRI 1 Bandung.',
                        'button' => 'Daftar Sekarang',
                    ],
                ],
            ],
        ];
    }
}
