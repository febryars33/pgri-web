<?php

namespace App\Filament\Resources\ExtracurricularCategories\Pages;

use App\Filament\Resources\ExtracurricularCategories\ExtracurricularCategoryResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewExtracurricularCategory extends ViewRecord
{
    protected static string $resource = ExtracurricularCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
