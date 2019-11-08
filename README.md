# Emoji Trends

## How emojis are used on Twitter

### Scraping
The tweets have been collected using the [GetOldTweets-python](https://github.com/fajarmf10/GetOldTweets-python) fork that includes emoji scrapping support. The Python script bypass some limitations of Twitter Official API in terms like accessing old tweets and requests limit.

The script used to download the tweets is composed by the following parameters:
`python3 Exporter.py --lang "en" --querysearch "🍎" --since 2014-02-03 --until 2014-02-04 &`

* lang "en": Filter the language of the tweets although is not always working, so tweets in other languages may appear in the dataset. English is the language selected to filter the tweets.
* querysearch "🍎": The text or emoji to be collected.
* since/until: tweet's date range. A one day range has been used for this project.

The scraping speed is around 3.7 million tweets per hour when running the script in parallel. Specifically, one instance of the script has been used for each day and for each emoji.

### Data structure
The data obtained have the following structure:
`"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"`
However, only the `date` and `emoji` columns are used for this project.

### Downsampling
The processed data is composed by 2405 values with the daily usage of each emoji over the years. To smoothly represent the data in the browser the [Largest-Triangle-Three-Buckets (LTTB) downsampling algorithm](https://github.com/devoxi/lttb-py) is applied to get 50 data points. The downsampled data keep the maximums/minimums while the data spacing is reasonable.

### Chart.js
(Chart.js)[https://www.chartjs.org/] is a Javascript library to create highly customizable interactive graphs .

### Plugins

* https://github.com/nagix/chartjs-plugin-rough
* https://github.com/chartjs/chartjs-plugin-deferred


### Codepens:

* https://codepen.io/fielding/pen/wYPRjj
* https://codepen.io/chrisgannon/pen/yjzPEO
* https://codepen.io/knyttneve/pen/EBNqPN


### Other stats: 

* count total tweets
* count total tweets per emoji
* Tweets per hour
* computation time
* Memory usage
