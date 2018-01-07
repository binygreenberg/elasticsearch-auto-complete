# elasticsearch-auto-complete
search words with autocomplete engine and filtered by popularity

Create google like autocomplete for words ranked by popularity. 

One of the beauties of elasticsearch is the autocomlete feature. 
Not only
See [this](https://www.elastic.co/blog/you-complete-me)
article to learn about how it works behind the sences (hint: graphs)

To get started download and install the latest version of elasticsearch.
 
 https://www.elastic.co/downloads/elasticsearch
```
curl -H'Content-Type: application/json' -XGET 'localhost:9200/_count?pretty' -d '
{
    "query": {
        "match_all": {}
    }
}'
```

curl -H'Content-Type: application/json' -XPUT 'localhost:9200/word?pretty' -d ' 
{
  "mappings": {
    "website": {
      "properties": {
        "word": {
          "type": "completion"
        }
      }
    }
  }
}'

curl -H'Content-Type: application/json' -XPOST 'localhost:9200/word/website/_bulk?pretty' -d ' 
{"index":{"_id":"1"}}
{"word":{"input":"heelo","weight":2}}
{"index":{"_id":"2"}}
{"word":{"input":"hello","weight":3}}
{"index":{"_id":"3"}}
{"word":{"input":"world","weight":4}}
'
curl -H'Content-Type: application/json' -XPOST 'localhost:9200/word/_search?pretty' -d '
{
  "_source": false,
    "suggest": {
        "word-suggest" : {
            "prefix" : "H",
            "completion" : {
                "field" : "word"
            }
        }
    }
}'

curl -H'Content-Type: application/json' -XPOST 'localhost:9200/word/website/1/_update' -d '
{
   "script" : "ctx._source.word.weight+=1"
}'
