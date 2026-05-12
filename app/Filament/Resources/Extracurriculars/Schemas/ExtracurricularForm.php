<?php

namespace App\Filament\Resources\Extracurriculars\Schemas;

use App\Enums\ChakraColorPalette;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;

class ExtracurricularForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
        ->columns(12)
        ->schema([

            // KOLOM KIRI (Informasi Utama & Galeri)
            Group::make()
                ->schema([
                    Section::make('Informasi Utama')
                        ->schema([
                            TextInput::make('name')
                                ->label('Nama Ekstrakurikuler')
                                ->required(),

                            Select::make('extracurricular_category_id')
                                ->label('Kategori')
                                ->relationship('extracurricular_category', 'name')
                                ->native(false)
                                ->required(),

                            RichEditor::make('description')
                                ->label('Deskripsi Lengkap')
                                ->columnSpanFull(),
                        ])->columns(1), // Di dalam section ini biarkan tumpuk 1 kolom biar lega

                    Section::make('Media Galeri')
                        ->schema([
                            SpatieMediaLibraryFileUpload::make('files')
                                ->collection('extracurricular_galleries')
                                ->multiple()
                                ->reorderable()
                                ->panelLayout('grid'),
                        ]),
                ])
                ->columnSpan(8), // Mengambil 8 dari 12 kolom (Sisi Luas)

            // KOLOM KANAN (Visual & Pelatih)
            Group::make()
                ->schema([
                    Section::make('Pengaturan Visual')
                        ->schema([
                            Select::make('icon')
                                ->label('Ikon')
                                ->options(self::getIconOptions())
                                ->native(false),

                            Select::make('theme_color')
                                ->label('Warna Tema')
                                ->native(false)
                                ->allowHtml()
                                ->options(
                                    collect(ChakraColorPalette::cases())
                                        ->mapWithKeys(fn ($color) => [$color->value => $color->getHtmlLabel()])
                                        ->toArray()
                                ),

                            Toggle::make('is_active')
                                ->label('Status Aktif')
                                ->default(false)
                                ->onColor('success')
                                ->offColor('danger'),
                        ]),

                    Section::make('Tim Pelatih')
                        ->schema([
                            Repeater::make('mentors')
                                ->hiddenLabel()
                                ->schema([
                                    TextInput::make('name')->label('Nama')->required(),
                                    TextInput::make('position')->label('Jabatan')->required(),
                                ])
                                ->defaultItems(0)
                                ->columns(1)
                                ->addActionLabel('Tambah Pelatih'),
                        ]),
                ])
                ->columnSpan(4), // Mengambil 4 dari 12 kolom (Sisi Samping)
        ]);
    }

    /**
     * Helper untuk opsi ikon agar tidak menulis ulang (Don't Repeat Yourself)
     */
    private static function getIconOptions(): array
    {
        return [
            'LuMonitor' => 'LuMonitor',
            'LuBeaker' => 'LuBeaker',
            'LuBook' => 'LuBook',
            'LuUtensils' => 'LuUtensils',
            'LuDribbble' => 'LuDribbble',
            'LuMusic' => 'LuMusic',
        ];
    }
}
