<?php

namespace App\Filament\Resources\Courses\Schemas;

use App\Models\Course;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CourseInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(12)
            ->components([

                // --- KOLOM KIRI: KONTEN UTAMA (Ambil 8 dari 12 Kolom) ---
                Section::make('Informasi Kursus')
                    ->description('Detail data utama dari kursus yang tersedia.')
                    ->schema([
                        TextEntry::make('code')
                            ->label('Kode Kursus')
                            ->badge()
                            ->color('primary')
                            ->columnSpan(4), // 4 dari 12 bagian internal section

                        TextEntry::make('name')
                            ->label('Nama Kursus')
                            ->weight('bold')
                            ->columnSpan(8), // 8 dari 12 bagian internal section

                        TextEntry::make('slug')
                            ->label('Slug URL')
                            ->color('gray')
                            ->columnSpanFull(),

                        TextEntry::make('description')
                            ->label('Deskripsi Lengkap')
                            ->html()
                            ->prose()
                            ->placeholder('Tidak ada deskripsi.')
                            ->columnSpanFull(),
                    ])
                    ->columns(12) // Grid internal di dalam section utama
                    ->columnSpan(8), // Menghabiskan lebar 8 kolom dari grid utama halaman


                // --- KOLOM KANAN: SIDEBAR STATUS & METADATA (Ambil 4 dari 12 Kolom) ---
                Group::make()
                    ->schema([

                        // Panel Media & Status Aktif
                        Section::make('Status & Media')
                            ->schema([
                                ImageEntry::make('thumbnail')
                                    ->label('Foto Sampul')
                                    ->placeholder('Tanpa Gambar')
                                    ->square()
                                    ->height(150),

                                IconEntry::make('is_active')
                                    ->label('Status Aktif')
                                    ->boolean(),
                            ]),

                        // Panel Jejak Waktu (Dibuat terpisah agar rapi)
                        Section::make('Metadata')
                            ->collapsed() // Bisa di-expand jika dibutuhkan oleh admin
                            ->schema([
                                TextEntry::make('created_at')
                                    ->label('Dibuat Pada')
                                    ->dateTime('d M Y H:i')
                                    ->placeholder('-'),

                                TextEntry::make('updated_at')
                                    ->label('Diperbarui Pada')
                                    ->dateTime('d M Y H:i')
                                    ->placeholder('-'),

                                TextEntry::make('deleted_at')
                                    ->label('Dihapus Pada')
                                    ->dateTime('d M Y H:i')
                                    ->color('danger')
                                    ->visible(fn (Course $record): bool => $record->trashed()),
                            ]),
                    ])
                    ->columnSpan(4), // Menghabiskan sisa lebar 4 kolom dari grid utama halaman

            ]);
    }
}
