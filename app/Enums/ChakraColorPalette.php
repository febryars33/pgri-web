<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum ChakraColorPalette: string implements HasLabel, HasColor
{
    case Gray = 'gray';
    case Red = 'red';
    case Orange = 'orange';
    case Yellow = 'yellow';
    case Green = 'green';
    case Teal = 'teal';
    case Blue = 'blue';
    case Cyan = 'cyan';
    case Purple = 'purple';
    case Pink = 'pink';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Gray => 'Gray',
            self::Red => 'Red',
            self::Orange => 'Orange',
            self::Yellow => 'Yellow',
            self::Green => 'Green',
            self::Teal => 'Teal',
            self::Blue => 'Blue',
            self::Cyan => 'Cyan',
            self::Purple => 'Purple',
            self::Pink => 'Pink',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Gray => 'gray',
            self::Red => 'danger',
            self::Orange => 'warning',
            self::Yellow => 'warning',
            self::Green => 'success',
            self::Teal => 'success',
            self::Blue => 'info',
            self::Cyan => 'info',
            self::Purple => 'primary',
            self::Pink => 'primary',
        };
    }

    public function getHtmlLabel(): string
{
    $colorHex = match ($this) {
        self::Gray => '#718096',
        self::Red => '#E53E3E',
        self::Orange => '#DD6B20',
        self::Yellow => '#D69E2E',
        self::Green => '#38A169',
        self::Teal => '#319795',
        self::Blue => '#3182CE',
        self::Cyan => '#00B5D8',
        self::Purple => '#805AD5',
        self::Pink => '#D53F8C',
        default => '#e2e8f0',
    };

    // Kembalikan string HTML biasa (jangan di-wrap HtmlString di sini)
    return '<div style="display: flex; align-items: center; gap: 10px;">' .
           '<div style="background-color: ' . $colorHex . '; width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;"></div>' .
           '<div>' . $this->getLabel() . '</div>' .
           '</div>';
}

}
