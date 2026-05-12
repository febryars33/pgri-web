<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AboutControllerTest extends TestCase
{
    /**
     * Ensure about page can be rendered successfully.
     */
    public function test_about_page_is_accessible(): void
    {
        $response = $this->get(route('about'));

        $response
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page->component('about')
            );
    }
}
