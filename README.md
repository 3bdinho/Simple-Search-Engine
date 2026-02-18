-Simple Search Engine

A Node.js, Express, and MongoDB search engine that demonstrates core search algorithms, ranking logic, and data structures. It helps illustrate how Google-like search engines work

-Key Concepts Demonstrated

1-Data Structures:
Inverted Index (HashMap)-> Maps terms docs the fundamental ds for efficient full-text search
Posting List (Array)-> For each term stores all docs containig it with freq and position info

2-String Processing
Tokenization: Breaking text into meanigful words
Text Normalization: Lowercaseing and removing punctuation
Stop word removal: filtering out common words that don't add meaning
Word Filtering: Removing very short words

3-Ranking & Searching Logic
TF-IDF Algo:
TF (Term Freq) -> How often a term appers in a doc
IDF (Inverse Doc Freq) -> How rare a term is across all docs
Socre = TF\*IDF (documents with rare query terms rank higher)

4-Algo Thinking
Search Process:
User Query -> Tokenize -> Find Doc -> Calc Score -> Rank Return Result

Algorithm Complexity:
indexing: O(n) where n = total words in doc
Search: O(M log n) where m = query terms , d = docs containing terms

project structure:
REVESION PROJECT
│
├── config
│ └── database.js # MongoDB connection configuration
│
├── engine
│ └── SearchEngine.js # Core search logic (ranking, scoring, search algorithm)
│
├── models
│ ├── Document.js # Document schema (stored pages/documents)
│ └── InvertedIndex.js # Inverted index schema for search indexing
│
├── Routes
│ ├── documentRoutes.js # Document API routes (create, manage documents)
│ └── searchRoutes.js # Search API routes
│
├── services
│ ├── documentService.js # Document business logic
│ └── searchService.js # Search request handling
│
├── utils
│ ├── ApiError.js # Custom error handling
│ ├── Indexer.js # Indexing logic for documents
│ ├── stemmer.js # Word stemming utility
│ ├── stopWords.js # Stop words filtering
│ └── tokenizer.js # Text tokenization
│
└── server.js # Application entry point

API Endpoints
Document Management

--Add a Document--
POST /api/documents
{
"title":"JavaScript Guide",
"content":"JavaScript is a programming language used for web development",
"url":"https://example.com/js"
}

--Get All Document--
Get /api/documents

--Get a specific document--
GET /api/documents/:id

--Delete document-- (Later)
DELETE /api/documents/:id

--Search Operations--

TF_IDF Ranked Search
GET /api/search?q=javascript&limit=10

Response includes TF-IDF socres and relevance ranking:
json
{
"status": "success",
"query": "JavaScript",
"count": 1,
"result": [
{
"id": "6995a4548d7ee6b0391d2450",
"title": "JavaScript Guide",
"url": "https://example.com/js",
"relevanceScore": "0.0000000000000000000000000000000000000000",
"matchedTerms": 1,
"excerpt": "JavaScript is a programming language used for web development..."
}
]
}
