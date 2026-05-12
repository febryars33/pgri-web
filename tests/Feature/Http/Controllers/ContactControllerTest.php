<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    /**
     * Ensure contact page can be rendered successfully.
     */
    public function test_contact_page_is_accessible(): void
    {
        $response = $this->get(route('contact'));

        $response
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page->component('contact')
            );
    }
}
