<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
     /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['project'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public $fillable = ['description','project_id','time'];
}
