<?php

namespace App\Services;

use GuzzleHttp\Client;

class NewsService
{
    protected $client;
    protected $newsApiKey;
    protected $guardianApiKey;
    protected $nytApiKey;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => false,
        ]);
        $this->newsApiKey = env('NEWS_API_KEY');
        $this->guardianApiKey = env('GUARDIAN_API_KEY');
        $this->nytApiKey = env('NYT_API_KEY');
    }

    public function fetchTopHeadlines($country = 'us')
    {
        $newsApiArticles = $this->fetchNewsApiTopHeadlines($country);
        $guardianArticles = $this->fetchGuardianTopHeadlines();
        $nytArticles = $this->fetchNytTopHeadlines();

        return array_merge($newsApiArticles, $guardianArticles, $nytArticles);
    }

    private function fetchNewsApiTopHeadlines($country)
    {
        $response = $this->client->get('https://newsapi.org/v2/top-headlines', [
            'query' => [
                'country' => $country,
                'apiKey' => $this->newsApiKey,
            ],
        ]);
        return json_decode($response->getBody()->getContents(), true)['articles'];
    }

    private function fetchGuardianTopHeadlines()
    {
        $response = $this->client->get('https://content.guardianapis.com/search', [
            'query' => [
                'api-key' => $this->guardianApiKey,
                'show-fields' => 'all',
                'order-by' => 'newest',
                'page-size' => 10,
            ],
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['response']['results'];
        return array_map(function ($article) {
            return [
                'title' => $article['webTitle'],
                'description' => $article['fields']['trailText'] ?? '',
                'url' => $article['webUrl'],
                'source' => 'The Guardian',
            ];
        }, $results);
    }

    private function fetchNytTopHeadlines()
    {
        $response = $this->client->get('https://api.nytimes.com/svc/topstories/v2/home.json', [
            'query' => [
                'api-key' => $this->nytApiKey,
            ],
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['results'];
        return array_map(function ($article) {
            return [
                'title' => $article['title'],
                'description' => $article['abstract'],
                'url' => $article['url'],
                'source' => 'New York Times',
            ];
        }, $results);
    }

    public function searchArticles($query)
    {
        $newsApiArticles = $this->searchNewsApiArticles($query);
        $guardianArticles = $this->searchGuardianArticles($query);
        $nytArticles = $this->searchNytArticles($query);

        return array_merge($newsApiArticles, $guardianArticles, $nytArticles);
    }

    private function searchNewsApiArticles($query)
    {
        $response = $this->client->get('https://newsapi.org/v2/everything', [
            'query' => [
                'q' => $query,
                'apiKey' => $this->newsApiKey,
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true)['articles'];
    }

    private function searchGuardianArticles($query)
    {
        $response = $this->client->get('https://content.guardianapis.com/search', [
            'query' => [
                'api-key' => $this->guardianApiKey,
                'q' => $query,
                'show-fields' => 'all',
                'order-by' => 'relevance',
                'page-size' => 10,
            ],
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['response']['results'];
        return array_map(function ($article) {
            return [
                'title' => $article['webTitle'],
                'description' => $article['fields']['trailText'] ?? '',
                'url' => $article['webUrl'],
                'source' => 'The Guardian',
            ];
        }, $results);
    }

    private function searchNytArticles($query)
    {
        $response = $this->client->get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
            'query' => [
                'q' => $query,
                'api-key' => $this->nytApiKey,
            ],
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['response']['docs'];
        return array_map(function ($article) {
            return [
                'title' => $article['headline']['main'],
                'description' => $article['snippet'],
                'url' => $article['web_url'],
                'source' => 'New York Times',
            ];
        }, $results);
    }

    public function filterArticles($filters)
    {
        $newsApiArticles = $this->filterNewsApiArticles($filters);
        $guardianArticles = $this->filterGuardianArticles($filters);
        $nytArticles = $this->filterNytArticles($filters);

        return array_merge($newsApiArticles, $guardianArticles, $nytArticles);
    }

    private function filterNewsApiArticles($filters)
    {
        $response = $this->client->get('https://newsapi.org/v2/everything', [
            'query' => array_merge($filters, ['apiKey' => $this->newsApiKey]),
        ]);

        return json_decode($response->getBody()->getContents(), true)['articles'];
    }

    private function filterGuardianArticles($filters)
    {
        $query = [
            'api-key' => $this->guardianApiKey,
            'show-fields' => 'all',
            'order-by' => 'relevance',
            'page-size' => 10,
        ];

        if (!empty($filters['q'])) {
            $query['q'] = $filters['q'];
        }

        if (!empty($filters['from-date']) && !empty($filters['to-date'])) {
            $query['from-date'] = $filters['from-date'];
            $query['to-date'] = $filters['to-date'];
        }

        if (!empty($filters['section'])) {
            $query['section'] = $filters['section'];
        }

        $response = $this->client->get('https://content.guardianapis.com/search', [
            'query' => $query,
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['response']['results'];
        return array_map(function ($article) {
            return [
                'title' => $article['webTitle'],
                'description' => $article['fields']['trailText'] ?? '',
                'url' => $article['webUrl'],
                'source' => 'The Guardian',
            ];
        }, $results);
    }

    private function filterNytArticles($filters)
    {
        $query = [
            'api-key' => $this->nytApiKey,
        ];

        if (!empty($filters['q'])) {
            $query['q'] = $filters['q'];
        }

        if (!empty($filters['begin_date']) && !empty($filters['end_date'])) {
            $query['begin_date'] = $filters['begin_date'];
            $query['end_date'] = $filters['end_date'];
        }

        if (!empty($filters['section'])) {
            $query['fq'] = 'section_name:("' . $filters['section'] . '")';
        }

        $response = $this->client->get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
            'query' => $query,
        ]);

        $results = json_decode($response->getBody()->getContents(), true)['response']['docs'];
        return array_map(function ($article) {
            return [
                'title' => $article['headline']['main'],
                'description' => $article['snippet'],
                'url' => $article['web_url'],
                'source' => 'New York Times',
            ];
        }, $results);
    }
}
