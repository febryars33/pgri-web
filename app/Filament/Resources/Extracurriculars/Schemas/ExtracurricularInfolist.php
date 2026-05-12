<?php

namespace App\Filament\Resources\Extracurriculars\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\TextSize;

class ExtracurricularInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(12)
            ->components([
                // ======================================================
                // HERO SECTION
                // ======================================================

                Section::make()
                    ->columnSpanFull()
                    ->schema([
                        Grid::make(12)
                            ->schema([
                                Group::make([
                                    TextEntry::make('extracurricular_category.name')
                                        ->label('Kategori')
                                        ->badge()
                                        ->color('primary')
                                        ->placeholder('-'),

                                    TextEntry::make('name')
                                        ->hiddenLabel()
                                        ->size(TextSize::Large)
                                        ->weight('bold')
                                        ->color('gray')
                                        ->placeholder('-'),

                                    TextEntry::make('slug')
                                        ->prefix('/extracurriculars/')
                                        ->copyable()
                                        ->color('gray')
                                        ->placeholder('-'),
                                ])
                                    ->columnSpan([
                                        'default' => 12,
                                        'lg' => 8,
                                    ]),

                                Group::make([
                                    IconEntry::make('is_active')
                                        ->label('Status')
                                        ->boolean()
                                        ->trueIcon('heroicon-m-check-circle')
                                        ->falseIcon('heroicon-m-x-circle')
                                        ->trueColor('success')
                                        ->falseColor('danger'),

                                    TextEntry::make('icon')
                                        ->label('Icon')
                                        ->badge()
                                        ->placeholder('-'),
                                ])
                                    ->columnSpan([
                                        'default' => 12,
                                        'lg' => 4,
                                    ]),
                            ]),
                    ]),

                // ======================================================
                // MENTORS
                // ======================================================

                Section::make('Pelatih')
                    ->description('Daftar pembimbing dan pelatih ekstrakurikuler.')
                    ->icon('heroicon-m-user-group')
                    ->columnSpanFull()
                    ->collapsible()
                    ->persistCollapsed()
                    ->schema([
                        RepeatableEntry::make('mentors')
                            ->hiddenLabel()
                            ->contained(false)
                            ->grid([
                                'default' => 1,
                                'md' => 2,
                                'xl' => 3,
                            ])
                            ->schema([
                                Section::make()
                                    ->compact()
                                    ->schema([
                                        TextEntry::make('name')
                                            ->label('Nama')
                                            ->weight('bold')
                                            ->size(TextSize::Medium)
                                            ->placeholder('-'),

                                        TextEntry::make('position')
                                            ->label('Jabatan')
                                            ->badge()
                                            ->color('gray')
                                            ->placeholder('-'),
                                    ]),
                            ]),
                    ]),

                // ======================================================
                // SIDEBAR INFO
                // ======================================================

                Section::make('Informasi')
                    ->icon('heroicon-m-information-circle')
                    ->columnSpan([
                        'default' => 12,
                        'xl' => 4,
                    ])
                    ->compact()
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Dibuat')
                            ->dateTime('d F Y H:i'),

                        TextEntry::make('updated_at')
                            ->label('Terakhir Diupdate')
                            ->since(),

                        TextEntry::make('mentors_count')
                            ->label('Jumlah Pelatih')
                            ->state(
                                fn ($record): int => collect($record->mentors)->count()
                            )
                            ->badge()
                            ->color('primary'),
                    ]),

                // ======================================================
                // DESCRIPTION
                // ======================================================

                Section::make('Deskripsi')
                    ->description('Informasi lengkap mengenai ekstrakurikuler.')
                    ->icon('heroicon-m-book-open')
                    ->collapsible()
                    ->persistCollapsed()
                    ->columnSpan([
                        'default' => 12,
                        'xl' => 8,
                    ])
                    ->schema([
                        TextEntry::make('description')
                            ->hiddenLabel()
                            ->html()
                            ->prose()
                            ->placeholder('Belum ada deskripsi.')
                            ->extraAttributes([
                                'class' => '
                                    max-w-none
                                    prose-neutral
                                    dark:prose-invert
                                    prose-headings:font-bold
                                    prose-p:text-gray-600
                                    dark:prose-p:text-gray-300
                                    prose-a:text-primary-600
                                    dark:prose-a:text-primary-400
                                    prose-img:rounded-2xl
                                    prose-img:shadow-sm
                                    prose-pre:rounded-2xl
                                ',
                            ]),
                    ]),
            ]);
    }
}
