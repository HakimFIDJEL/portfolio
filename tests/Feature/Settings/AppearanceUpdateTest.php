<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

test('appearance page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('settings.appearance.edit'));

    $response->assertOk();
});