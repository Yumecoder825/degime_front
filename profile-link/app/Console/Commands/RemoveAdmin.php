<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserMetadata;
use Illuminate\Console\Command;

class RemoveAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-admin {user_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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

        UserMetadata::delMeta($user_id, 'admin');
        $this->info('Admin remove: ' . $user_id);
    }
}
