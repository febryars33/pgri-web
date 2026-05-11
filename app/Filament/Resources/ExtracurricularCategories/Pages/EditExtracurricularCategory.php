<?php

namespace App\Filament\Resources\ExtracurricularCategories\Pages;

use App\Filament\Resources\ExtracurricularCategories\ExtracurricularCategoryResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditExtracurricularCategory extends EditRecord
{
    protected static string $resource = ExtracurricularCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
