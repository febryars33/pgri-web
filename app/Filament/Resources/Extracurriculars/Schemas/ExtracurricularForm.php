<?php

namespace App\Filament\Resources\Extracurriculars\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ExtracurricularForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('extracurricular_category_id')
                    ->label('Kategori')
                    ->relationship('extracurricular_category', 'name')
                    ->native(false)
                    ->required()
                    ->createOptionForm([
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
                    ]),
                TextInput::make('name')
                    ->label('Nama Ekstrakurikuler')
                    ->required(),
                // TextInput::make('slug')
                //     ->required(),
                RichEditor::make('description')
                    ->label('Deskripsi Ekstrakurikuler')
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
                Toggle::make('is_active')
                    ->label('Apakah ekstrakurikuler ini aktif?')
                    ->columnSpanFull()
                    ->default(false),
                SpatieMediaLibraryFileUpload::make('files')
                    ->label('Galeri Ekstrakurikuler')
                    ->columnSpanFull()
                    ->collection('extracurricular_galleries')
                    ->reorderable()
                    ->downloadable()
                    ->deletable(),
                Section::make('Pelatih')
                    ->columnSpanFull()
                    ->schema([
                        Repeater::make('mentors')
                            ->hiddenLabel()
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nama Pelatih')
                                    ->required(),
                                TextInput::make('position')
                                    ->label('Jabatan')
                                    ->required(),
                            ])
                            ->columns(2),
                    ]),
            ]);
    }
}
