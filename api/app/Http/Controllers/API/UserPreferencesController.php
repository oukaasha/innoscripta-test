<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
   
class UserPreferencesController extends BaseController
{
    public function getPreferences()
    {
        $user = Auth::user();
        return response()->json([
            'preferredSources' => $user->preferred_sources,
            'preferredCategories' => $user->preferred_categories,
            'preferredAuthors' => $user->preferred_authors,
        ]);
    }

    public function updatePreferences(Request $request)
    {
        $user = Auth::user();
        $user->preferred_sources = $request->preferredSources;
        $user->preferred_categories = $request->preferredCategories;
        $user->preferred_authors = $request->preferredAuthors;
        $user->save();

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
