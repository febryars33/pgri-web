<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Enums\PostStatus;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('post_category_id')
                    ->native(false)
                    ->searchable()
                    ->preload()
                    ->relationship('post_category', 'name')
                    ->createOptionForm([
                        TextInput::make('name')
                            ->required(),
                        Textarea::make('description')
                            ->columnSpanFull(),
                    ]),
                TextInput::make('title')
                    ->required(),
                RichEditor::make('body')
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('image')
                    ->columnSpanFull()
                    ->collection('covers')
                    ->image()
                    ->imageEditor(),
                Select::make('status')
                    ->native(false)
                    ->options(PostStatus::class)
                    ->default('draft')
                    ->required(),
                SpatieTagsInput::make('tags'),
                Section::make('attachments')
                    ->columnSpanFull()
                    ->label('File Pendukung')
                    ->description('Pilih file pendukung untuk postingan ini.')
                    ->schema([
                        Repeater::make('attachments')
                            ->relationship('post_attachments')
                            ->label('File lampiran')
                            ->schema([
                                TextInput::make('name')
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('files')
                                    ->collection('post_attachments')
                                    ->reorderable()
                                    ->downloadable()
                                    ->deletable(),
                            ])
                            ->defaultItems(0)
                            ->columns(2),
                    ]),
            ]);
    }
}
