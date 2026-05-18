<?php

use App\Providers\AppServiceProvider;
use App\Providers\Filament\AdminPanelProvider;
use CyrildeWit\EloquentViewable\EloquentViewableServiceProvider;

return [
    AppServiceProvider::class,
    AdminPanelProvider::class,
    EloquentViewableServiceProvider::class,
];
