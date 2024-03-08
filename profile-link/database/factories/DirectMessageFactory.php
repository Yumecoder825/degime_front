<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Model>
 */
class DirectMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'from_user_id' => User::inRandomOrder()->first()->id,
            'to_user_id' => '999c5a4a-07a5-498e-8611-33040a9b6ad6',
            'message' => $this->faker->text(400),
        ];
    }
}
