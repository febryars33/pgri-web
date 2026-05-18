<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('code')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                RichEditor::make('description')
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'h2',
                        'h3',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'bulletList',
                        'orderedList',
                        'undo',
                        'redo',
                    ]),
                FileUpload::make('thumbnail')
                    ->columnSpanFull()
                    ->image(),
                Toggle::make('is_active')
                    ->label('Apakah mata pelajar ini aktif?')
                    ->onColor('success')
                    ->offColor('danger')
            ]);
    }
}
