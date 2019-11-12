# Emoji Trends: How emojis are used on Twitter

Webpage: [emoji.enricmor.eu](emoji.enricmor.eu)

![Hits](https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Fenric1994%2Femoji_trends)

![Alt text](img/demo.png?raw=true)
![Alt text](img/demo1.png?raw=true)


### Scraping
The tweets have been collected using the [GetOldTweets-python](https://github.com/fajarmf10/GetOldTweets-python) fork that includes emoji support. The Python script bypass some limitations of Twitter Official API like accessing old tweets and requests limit.

The script used to download the tweets is composed by the following parameters:
`python3 Exporter.py --lang "en" --querysearch "🍎" --since 2014-02-03 --until 2014-02-04 &`

* lang "en": Filters the language of the tweets. English is the language selected to filter the tweets.
* querysearch "🍎": The text or emoji to be collected.
* since/until: tweet's date range. A one day range has been used for this project.

The scraping speed is around 3.7 million tweets per hour when running the script in parallel. Specifically, one instance of the script has been used for each day and for each emoji.

In terms of accuracy, the scrapper miss some tweets and missclassify the language of some tweets in other languages as English. However, the data extracted provide good insights in terms of the frequency of the different emojis.

### Data Structure
The data obtained have the following structure:
`"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"`
However, only the `date` and `emoji` columns are used for this project.

### Downsampling
The processed data is composed by 2405 values with the daily usage of each emoji over the years. To smoothly represent the data in the browser the [Largest-Triangle-Three-Buckets (LTTB) downsampling algorithm](https://github.com/devoxi/lttb-py) is applied to reduce it to 50 data points. The downsampled data keep the maximums/minimums while the data spacing is reasonable.

### Chart.js
In order to visualize the data, [Chart.js](https://www.chartjs.org/) has been used. 
Chart.js is a Javascript library to create highly customizable interactive graphs on the browser.

### Chart.js Plugins
The following plugins have been used to customize the charts:

* [Rough](https://github.com/nagix/chartjs-plugin-rough): adds a cartoon-like style too the charts.
* [Deferred](https://github.com/chartjs/chartjs-plugin-deferred): adds a delay when loading the charts.


### Other sources:

The following examples are used in the website: 

* https://codepen.io/fielding/pen/wYPRjj
* https://codepen.io/chrisgannon/pen/yjzPEO
* https://codepen.io/knyttneve/pen/EBNqPN


### Some stats: 

* count total tweets: (still collecting...)
* count total tweets per emoji: (still collecting...)
* Tweets scrapped per hour: 3.7 million
* Memory usage: (still growing...)
