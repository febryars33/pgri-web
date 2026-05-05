<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Models\Post;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\SpatieTagsEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('post_category.name')
                    ->label('Post category')
                    ->placeholder('-'),
                TextEntry::make('title'),
                TextEntry::make('body')
                    ->html()
                    ->placeholder('-')
                    ->columnSpanFull(),
                SpatieMediaLibraryImageEntry::make('image')
                    ->columnSpanFull()
                    ->collection('covers')
                    ->placeholder('-'),
                TextEntry::make('status')
                    ->badge(),
                SpatieTagsEntry::make('tags'),
                TextEntry::make('slug')
                    ->columnSpanFull(),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (Post $record): bool => $record->trashed()),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
