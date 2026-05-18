<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Enums\PostStatus;
use App\Models\Post;
use App\Models\PostAttachment;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\SpatieTagsEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\TextSize;
use Illuminate\Support\Number;

class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(12)
            ->components([
                // ======================================================
                // MAIN CONTENT
                // ======================================================

                Group::make([
                    // ======================================================
                    // HERO SECTION
                    // ======================================================

                    Section::make()
                        ->schema([
                            Grid::make(12)
                                ->schema([
                                    TextEntry::make('post_category.name')
                                        ->hiddenLabel()
                                        ->badge()
                                        ->icon('heroicon-m-tag')
                                        ->color('primary')
                                        ->placeholder('-')
                                        ->columnSpan(6),

                                    TextEntry::make('status')
                                        ->hiddenLabel()
                                        ->badge()
                                        ->alignEnd()
                                        ->formatStateUsing(
                                            fn ($state) => str($state->value ?? $state)
                                                ->headline()
                                        )
                                        ->color(
                                            fn ($state): string => match ($state->value ?? $state) {
                                                PostStatus::PUBLISHED->value => 'success',
                                                PostStatus::DRAFT->value => 'warning',
                                                default => 'gray',
                                            }
                                        )
                                        ->columnSpan(6),

                                    TextEntry::make('title')
                                        ->hiddenLabel()
                                        ->size(TextSize::Large)
                                        ->weight('bold')
                                        ->color('gray')
                                        ->columnSpanFull(),

                                    TextEntry::make('excerpt')
                                        ->hiddenLabel()
                                        ->placeholder('Tidak ada ringkasan.')
                                        ->color('gray')
                                        ->size('lg')
                                        ->columnSpanFull(),

                                    SpatieMediaLibraryImageEntry::make('image')
                                        ->hiddenLabel()
                                        ->collection('covers')
                                        ->height(400)
                                        ->extraAttributes([
                                            'class' => '
                                                rounded-3xl
                                                overflow-hidden
                                                shadow-sm
                                                ring-1
                                                ring-gray-950/5
                                                dark:ring-white/10
                                            ',
                                        ])
                                        ->columnSpanFull(),
                                ]),
                        ])
                        ->compact(),

                    // ======================================================
                    // CONTENT
                    // ======================================================

                    Section::make('Konten Postingan')
                        ->description('Isi lengkap artikel atau berita.')
                        ->icon('heroicon-m-book-open')
                        ->collapsible()
                        ->persistCollapsed()
                        ->schema([
                            TextEntry::make('body')
                                ->hiddenLabel()
                                ->html()
                                ->prose()
                                ->placeholder('Konten kosong.')
                                ->extraAttributes([
                                    'class' => '
                                        max-w-none
                                        prose-neutral
                                        dark:prose-invert

                                        prose-headings:font-bold
                                        prose-headings:tracking-tight

                                        prose-p:text-gray-700
                                        dark:prose-p:text-gray-300

                                        prose-a:text-primary-600
                                        dark:prose-a:text-primary-400

                                        prose-img:rounded-2xl
                                        prose-img:shadow-sm

                                        prose-pre:rounded-2xl

                                        prose-blockquote:border-primary-500
                                        prose-blockquote:bg-gray-50
                                        dark:prose-blockquote:bg-white/5
                                    ',
                                ]),
                        ]),
                ])
                    ->columnSpan([
                        'default' => 12,
                        'xl' => 8,
                    ]),

                // ======================================================
                // SIDEBAR
                // ======================================================

                Group::make([
                    // ======================================================
                    // META
                    // ======================================================

                    Section::make('Metadata')
                        ->icon('heroicon-m-information-circle')
                        ->compact()
                        ->schema([
                            TextEntry::make('slug')
                                ->label('Permalink')
                                ->prefix('/posts/')
                                ->copyable()
                                ->copyMessage('Slug berhasil disalin')
                                ->placeholder('-')
                                ->color('gray'),

                            SpatieTagsEntry::make('tags')
                                ->label('Tags')
                                ->placeholder('-'),
                        ]),

                    // ======================================================
                    // TIMELINE
                    // ======================================================

                    Section::make('Publikasi')
                        ->icon('heroicon-m-clock')
                        ->compact()
                        ->schema([
                            TextEntry::make('published_at')
                                ->label('Dipublikasikan')
                                ->since()
                                ->placeholder('Belum dipublikasikan'),

                            TextEntry::make('created_at')
                                ->label('Dibuat')
                                ->dateTime('d F Y • H:i'),

                            TextEntry::make('updated_at')
                                ->label('Terakhir Diupdate')
                                ->since(),
                        ]),

                    // ======================================================
                    // STATS
                    // ======================================================

                    Section::make('Statistik')
                        ->icon('heroicon-m-chart-bar')
                        ->compact()
                        ->schema([
                            TextEntry::make('attachments_count')
                                ->label('Jumlah Lampiran')
                                ->state(
                                    fn ($record): int => $record->post_attachments?->count() ?? 0
                                )
                                ->badge()
                                ->color('primary'),

                            TextEntry::make('reading_time')
                                ->label('Estimasi Baca')
                                ->state(function ($record): string {
                                    $words = str_word_count(
                                        strip_tags($record->body ?? '')
                                    );

                                    $minutes = max(1, ceil($words / 200));

                                    return "{$minutes} menit";
                                })
                                ->badge()
                                ->color('gray'),

                            TextEntry::make('views_count')
                                ->label('Dibaca')
                                ->state(function(Post $record) {
                                    return views($record)->count();
                                })
                                ->badge()
                                ->color('gray'),
                        ]),
                ])
                    ->columnSpan([
                        'default' => 12,
                        'xl' => 4,
                    ]),

                // ======================================================
                // ATTACHMENTS
                // ======================================================

                Section::make('Lampiran File')
                    ->description('File tambahan yang berkaitan dengan postingan.')
                    ->icon('heroicon-m-paper-clip')
                    ->collapsible()
                    ->persistCollapsed()
                    ->columnSpanFull()
                    ->schema([
                        RepeatableEntry::make('post_attachments')
                            ->hiddenLabel()
                            ->contained(false)
                            ->grid([
                                'default' => 1,
                                'md' => 2,
                                'xl' => 4,
                            ])
                            ->schema([
                                Section::make()
                                    ->compact()
                                    ->schema([
                                        TextEntry::make('name')
                                            ->hiddenLabel()
                                            ->weight('bold')
                                            ->placeholder('No File')
                                            ->formatStateUsing(
                                                fn (PostAttachment $record) => $record
                                                    ->getFirstMedia('post_attachments')
                                                    ?->file_name ?? 'No File'
                                            )
                                            ->helperText(function (
                                                PostAttachment $record
                                            ) {
                                                $media = $record->getFirstMedia(
                                                    'post_attachments'
                                                );

                                                return $media
                                                    ? Number::fileSize($media->size)
                                                    : '0 KB';
                                            })
                                            ->icon(function (
                                                PostAttachment $record
                                            ) {
                                                $ext = $record
                                                    ->getFirstMedia(
                                                        'post_attachments'
                                                    )
                                                    ?->extension;

                                                return match ($ext) {
                                                    'pdf' => 'heroicon-m-document-text',
                                                    'xlsx', 'xls', 'csv' => 'heroicon-m-table-cells',
                                                    'doc', 'docx' => 'heroicon-m-document',
                                                    'txt' => 'heroicon-m-document',
                                                    default => 'heroicon-m-paper-clip',
                                                };
                                            })
                                            ->iconColor(function (
                                                PostAttachment $record
                                            ) {
                                                $ext = $record
                                                    ->getFirstMedia(
                                                        'post_attachments'
                                                    )
                                                    ?->extension;

                                                return match ($ext) {
                                                    'pdf' => 'danger',
                                                    'xlsx', 'xls', 'csv' => 'success',
                                                    'doc', 'docx' => 'info',
                                                    'txt' => 'gray',
                                                    default => 'warning',
                                                };
                                            })
                                            ->url(
                                                fn (PostAttachment $record) => $record->getFirstMediaUrl(
                                                    'post_attachments'
                                                )
                                            )
                                            ->openUrlInNewTab(),
                                    ]),
                            ]),
                    ]),
            ]);
    }
}
