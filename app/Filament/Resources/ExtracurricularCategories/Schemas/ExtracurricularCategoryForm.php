<?php

namespace App\Filament\Resources\ExtracurricularCategories\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ExtracurricularCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Select::make('icon')
                    ->options([
                        'LuMonitor' => 'LuMonitor',
                        'LuBeaker' => 'LuBeaker',
                        'LuBook' => 'LuBook',
                        'LuUtensils' => 'LuUtensils',
                        'LuDribbble' => 'LuDribbble',
                        'LuMusic' => 'LuMusic',
                    ])
                    ->native(false),
            ]);
    }
}
