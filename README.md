# Simple Search Engine

A Node.js, Express, and MongoDB search engine that demonstrates core search algorithms, ranking logic, and data structures. It helps illustrate how Google-like search engines work

# Key Concepts Demonstrated

# 1-**Data Structures**

_Inverted Index (HashMap)_ Maps terms docs the fundamental ds for efficient full-text search
_Posting List (Array)_ For each term stores all docs containig it with freq and position info

# 2-**String Processing**

_Tokenization_: Breaking text into meanigful words
_Text Normalization_: Lowercaseing and removing punctuation
_Stop word removal_: filtering out common words that don't add meaning
_Word Filtering_: Removing very short words

# 3- **Ranking & Searching Logic**

_TF-IDF Algo_
TF (Term Freq) -> How often a term appers in a doc
IDF (Inverse Doc Freq) -> How rare a term is across all docs
Socre = TF\*IDF (documents with rare query terms rank higher)

# 4-**Algo Thinking**

_Search Process_
User Query -> Tokenize -> Find Doc -> Calc Score -> Rank Return Result

Algorithm Complexity:
_indexing_: O(n) where n = total words in doc
_Search_: O(M log n) where m = query terms , d = docs containing terms

# project structure:

SEACH ENGINE
├── config
│   └── database.js       # MongoDB connection configuration
├── engine
├── models
│   ├── Document.js       # Document schema (stored pages/documents)
│   └── InvertedIndex.js  # Inverted index schema for search indexing
├── Routes
│   ├── documentRoutes.js # Document API routes (create, manage documents)
│   └── searchRoutes.js   # Search API routes
├── services
│   ├── documentService.js # Document business logic
│   └── searchService.js   # Search request handling
├── utils
│   ├── ApiError.js       # Custom error handling
│   ├── Indexer.js        # Indexing logic for documents
│   ├── stemmer.js        # Word stemming utility
│   ├── stopWords.js      # Stop words filtering
│   └── tokenizer.js      # Text tokenization
└── server.js             # Application entry point


## API Endpoints

Document Management

**Add a Document**

```bash
POST /api/documents

{
  "title": "JavaScript Fundamentals",
  "content": "JavaScript is a versatile programming language used for web development...",
  "url": "https://example.com/js-guide"
}
```

**Get All Documents**
```bash
GET /api/documents
```

**Get Specific Document**
```bash
GET /api/documents/:id
```

**Delete Document**(Later)
```bash
DELETE /api/documents/:id
```

### Search Operations

**TF_IDF Ranked Search**
```bash
GET /api/search?q=javascript&limit=10
```

Response includes TF-IDF socres and relevance ranking:
```json
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
```
