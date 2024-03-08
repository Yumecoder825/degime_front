<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserMetadata;
use Illuminate\Console\Command;

class AddAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-admin {user_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user_id = $this->argument('user_id');
        $user = User::find($user_id);
        if($user === null) {
            $this->error('User not found: ' . $user_id);
        }

        UserMetadata::setMeta($user_id, 'admin', 'true');
        $this->info('Admin add: ' . $user_id);
    }
}
