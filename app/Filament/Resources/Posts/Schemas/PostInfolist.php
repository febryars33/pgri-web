<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Models\PostAttachment;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\SpatieTagsEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(['default' => 1, 'lg' => 3]) // ✅ Pindahkan columns ke schema langsung
            ->components([

                // --- KOLOM KIRI (UTAMA: 2 KOLOM) ---
                Group::make()
                    ->columnSpan(['default' => 1, 'lg' => 2]) // ✅ Tambahkan 'default' => 1 agar mobile stack
                    ->schema([

                        // Header: Kategori, Status, Title & Image
                        Section::make()
                            ->schema([
                                Grid::make(2)->schema([
                                    TextEntry::make('post_category.name')
                                        ->hiddenLabel()
                                        ->badge()
                                        ->color('primary')
                                        ->icon('heroicon-m-tag'),
                                    TextEntry::make('status')
                                        ->hiddenLabel()
                                        ->badge()
                                        ->color(fn ($state): string => match ($state->value ?? $state) {
                                            'published', \App\Enums\PostStatus::PUBLISHED => 'success',
                                            'draft', \App\Enums\PostStatus::DRAFT => 'warning',
                                            default => 'gray',
                                        })
                                        ->alignEnd(),
                                ]),

                                TextEntry::make('title')
                                    ->hiddenLabel()
                                    ->weight('bold')
                                    ->extraAttributes([
                                        'class' => 'text-3xl font-extrabold tracking-tight mt-4 block text-gray-900 dark:text-white'
                                    ]),

                                SpatieMediaLibraryImageEntry::make('image')
                                    ->hiddenLabel()
                                    ->collection('covers')
                                    ->extraAttributes(['class' => 'rounded-xl overflow-hidden shadow-lg mt-6 w-full']),
                            ]),

                        // Konten Postingan (Body)
                        Section::make('Konten Postingan')
                            ->icon('heroicon-m-book-open')
                            ->collapsible()
                            ->schema([
                                TextEntry::make('body')
                                    ->hiddenLabel()
                                    ->html()
                                    ->prose()
                                    ->placeholder('Konten kosong')
                                    ->extraAttributes(['class' => 'max-w-none dark:prose-invert']),
                            ]),
                    ]),

                // --- KOLOM KANAN (SIDEBAR: 1 KOLOM) ---
                Group::make()
                    ->columnSpan(['default' => 1, 'lg' => 1]) // ✅ Tambahkan 'default' => 1
                    ->schema([
                        Section::make('Metadata')
                            ->icon('heroicon-m-information-circle')
                            ->schema([
                                TextEntry::make('slug')
                                    ->label('Link Permalink')
                                    ->icon('heroicon-m-link')
                                    ->color('gray')
                                    ->size('sm')
                                    ->copyable(),

                                SpatieTagsEntry::make('tags')
                                    ->label('Tags Terkait'),
                            ]),

                        Section::make('Riwayat')
                            ->icon('heroicon-m-clock')
                            ->schema([
                                TextEntry::make('created_at')
                                    ->dateTime('d M Y, H:i')
                                    ->label('Dibuat')
                                    ->icon('heroicon-m-calendar-days')
                                    ->size('sm'),

                                TextEntry::make('updated_at')
                                    ->dateTime('d M Y, H:i')
                                    ->label('Diperbarui')
                                    ->icon('heroicon-m-arrow-path')
                                    ->size('sm'),
                            ]),
                    ]),

                // --- FILE PENDUKUNG (FULL WIDTH DI BAWAH) ---
                Section::make('File pendukung')
                    ->columnSpanFull()
                    ->description('Berikut adalah file pendukung postingan ini.')
                    ->collapsible()
                    ->schema([
                        RepeatableEntry::make('post_attachments')
                            ->hiddenLabel()
                            ->grid(4)
                            ->schema([
                                TextEntry::make('name')
                                    ->label(fn (PostAttachment $record) => $record->name)
                                    ->badge()
                                    ->color('gray')
                                    ->formatStateUsing(fn (PostAttachment $record) => $record->getFirstMedia('post_attachments')?->file_name ?? 'No File')
                                    ->helperText(function (PostAttachment $record) {
                                        $media = $record->getFirstMedia('post_attachments');
                                        return $media ? \Illuminate\Support\Number::fileSize($media->size) : '0 KB';
                                    })
                                    ->icon(function (PostAttachment $record) {
                                        $ext = $record->getFirstMedia('post_attachments')?->extension;
                                        return match ($ext) {
                                            'pdf' => 'heroicon-m-document-text',
                                            'xlsx', 'xls', 'csv' => 'heroicon-m-table-cells',
                                            'doc', 'docx' => 'heroicon-m-document-arrow-down',
                                            'txt' => 'heroicon-m-document',
                                            default => 'heroicon-m-question-mark-circle',
                                        };
                                    })
                                    ->iconColor(function (PostAttachment $record) {
                                        $ext = $record->getFirstMedia('post_attachments')?->extension;
                                        return match ($ext) {
                                            'pdf' => 'danger',
                                            'xlsx', 'xls', 'csv' => 'success',
                                            'doc', 'docx' => 'info',
                                            'txt' => 'gray',
                                            default => 'warning',
                                        };
                                    })
                                    ->tooltip(function (PostAttachment $record): string {
                                        $ext = $record->getFirstMedia('post_attachments')?->extension;
                                        return match ($ext) {
                                            'pdf', 'txt' => 'Klik untuk melihat dokumen',
                                            default => 'Klik untuk mengunduh file',
                                        };
                                    })
                                    ->url(fn (PostAttachment $record) => $record->getFirstMediaUrl('post_attachments'))
                                    ->openUrlInNewTab(),
                            ])
                    ]),
            ]);
    }
}
