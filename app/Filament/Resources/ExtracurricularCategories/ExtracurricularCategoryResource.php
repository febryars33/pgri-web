<?php

namespace App\Filament\Resources\ExtracurricularCategories;

use App\Filament\Resources\ExtracurricularCategories\Pages\CreateExtracurricularCategory;
use App\Filament\Resources\ExtracurricularCategories\Pages\EditExtracurricularCategory;
use App\Filament\Resources\ExtracurricularCategories\Pages\ListExtracurricularCategories;
use App\Filament\Resources\ExtracurricularCategories\Pages\ViewExtracurricularCategory;
use App\Filament\Resources\ExtracurricularCategories\Schemas\ExtracurricularCategoryForm;
use App\Filament\Resources\ExtracurricularCategories\Schemas\ExtracurricularCategoryInfolist;
use App\Filament\Resources\ExtracurricularCategories\Tables\ExtracurricularCategoriesTable;
use App\Models\ExtracurricularCategory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ExtracurricularCategoryResource extends Resource
{
    protected static ?string $model = ExtracurricularCategory::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    protected static string|UnitEnum|null $navigationGroup = 'Ekstrakurikuler';

    protected static ?string $navigationLabel = 'Kategori';

    public static function form(Schema $schema): Schema
    {
        return ExtracurricularCategoryForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ExtracurricularCategoryInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExtracurricularCategoriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListExtracurricularCategories::route('/'),
            'create' => CreateExtracurricularCategory::route('/create'),
            'view' => ViewExtracurricularCategory::route('/{record}'),
            'edit' => EditExtracurricularCategory::route('/{record}/edit'),
        ];
    }
}
