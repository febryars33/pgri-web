<?php

namespace App\Filament\Resources\ExtracurricularCategories\Pages;

use App\Filament\Resources\ExtracurricularCategories\ExtracurricularCategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListExtracurricularCategories extends ListRecords
{
    protected static string $resource = ExtracurricularCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
