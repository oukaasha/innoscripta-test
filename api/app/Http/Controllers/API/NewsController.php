<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Services\NewsService;
use App\Http\Controllers\API\BaseController as BaseController;
   
class NewsController extends BaseController
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function topHeadlines()
    {
        $articles = $this->newsService->fetchTopHeadlines();
        return response()->json(['articles' => $articles]);
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
        $articles = $this->newsService->searchArticles($query);
        return response()->json(['articles' => $articles]);
    }

    public function filter(Request $request)
    {
        $filters = $request->all();
        $articles = $this->newsService->filterArticles($filters);
        return response()->json(['articles' => $articles]);
    }
}
