<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('name_fr');
            $table->string('name_en');

            $table->timestamps();
        });

        Schema::create('stacks', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('name_fr');
            $table->string('name_en');

            $table->timestamps();
        });

        Schema::create('stack_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stack_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('name');

            $table->timestamps();
        });

        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('name_fr');
            $table->string('name_en');

            $table->timestamps();
        });

        Schema::create('tool_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tool_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('name');

            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('slug_fr')->unique();
            $table->string('slug_en')->unique();

            $table->string('title_fr');
            $table->string('title_en');

            $table->string('subtitle_fr')->nullable();
            $table->string('subtitle_en')->nullable();

            $table->text('description_fr')->nullable();
            $table->text('description_en')->nullable();

            $table->text('feedback_fr')->nullable();
            $table->text('feedback_en')->nullable();

            $table->text('what_i_learned_fr')->nullable();
            $table->text('what_i_learned_en')->nullable();

            $table->string('source_code_url')->nullable();
            $table->string('live_demo_url')->nullable();

            $table->boolean('is_new')->default(false);    
            $table->date('end_date')->nullable();

            $table->timestamps();
        });

        Schema::create('attachment_projects', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attachment_id')->constrained()->cascadeOnDelete();

            $table->unsignedInteger('sort_order')->default(0);

            $table->unique(['project_id', 'attachment_id', 'sort_order']);
        });

        Schema::create('project_tags', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();

            $table->unique(['project_id', 'tag_id']);
        });

        Schema::create('project_stack_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('stack_item_id')->constrained()->cascadeOnDelete();

            $table->unique(['project_id', 'stack_item_id']);
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('icon');
            $table->string('label');
            $table->string('link');

            $table->string('name_fr');
            $table->string('name_en');

            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('company');

            $table->string('job_fr');
            $table->string('job_en');

            $table->string('status_fr');
            $table->string('status_en');

            $table->string('duration');

            $table->text('description_fr');
            $table->text('description_en');

            $table->timestamps();
        });

        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('institution');

            $table->string('type_fr');
            $table->string('type_en');

            $table->string('duration');

            $table->text('description_fr');
            $table->text('description_en');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('project_stack_items');
        Schema::dropIfExists('project_tags');
        Schema::dropIfExists('attachment_projects');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('tool_items');
        Schema::dropIfExists('tools');
        Schema::dropIfExists('stack_items');
        Schema::dropIfExists('stacks');
        Schema::dropIfExists('tags');
    }
};
