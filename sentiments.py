import csv
import numpy as np
import pandas as pd
import os
from textblob import TextBlob


def get_all_dates(name, top_num):
    with open('output/{}.csv'.format(name), 'r') as f:
        data = []
        dates = []
        response = []
        csvf = csv.reader(f, delimiter=',')
        next(f)
        count = 0
        for row in csvf:
            data.append(row[1])
            dates.append(row[0])
        # data = list(map(int, data))
        # top10index = np.array(data).argsort()[-top_num:]
        # for i in top10index:
        #     response.append(dates[i])
        # print(response[::-1])
        return dates, data


def get_tweets_on_date(date, name):

    print('Filtering day...')
    os.system("awk '/{}/' {} > {}".format(date, 'whathappened/{}_no_header.csv'.format(name), 'whathappened/{}_day.csv'.format(name)))
    # Add header
    header='"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"'
    os.system("sed -i '1 i\{}' {}".format(header, 'whathappened/{}_day.csv'.format(name)))

    print('Reading day...')
    tweets = pd.read_csv('whathappened/{}_day.csv'.format(name))["text"]
    print('Cleaning temp file...')
    os.system('rm {}'.format('whathappened/{}_day.csv'.format(name)))
    return tweets

def analyze(date, word):
    dates, data = get_all_dates(word, 5)
    with open('data/sentiment/{}.csv'.format(word), 'w') as f2:
            csvf2 = csv.writer(f2, delimiter=',', quoting=csv.QUOTE_NONE, escapechar=' ')
            csvf2.writerow(['day','usage'])
            for i, day in enumerate(dates):
                tweets = get_tweets_on_date(day, word)
                sentiment = TextBlob(tweets.to_string())
                print(day)
                score = str(sentiment.sentiment.polarity*100 + 100)[:3]
                print(score)
                csvf2.writerow([day, str(data[i]) + "." + score])

    

analyze('2019-02-04', 'beer2')
