import csv
import numpy as np
import pandas as pd
import os
from textblob import TextBlob


def get_all_dates(name):
    with open('/media/enric/enric_hdd/datasets/emoji_trends/emojis_50/{}.csv'.format(name), 'r') as f:
        data = []
        dates = []
        response = []
        csvf = csv.reader(f, delimiter=',')
        next(f)
        count = 0
        for row in csvf:
            data.append(row[1])
            dates.append(row[0])
        return dates, data


def get_tweets_on_date(date, name):

    os.system("awk '/{}/' {} > {}".format(date, '/media/enric/enric_hdd/datasets/emoji_trends/clean_emojis/{}_no_header.csv'.format(name), 'tmp/{}_day.csv'.format(name)))
    # Add header
    header='"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"'
    os.system("sed -i '1 i\{}' {}".format(header, 'tmp/{}_day.csv'.format(name)))

    tweets = pd.read_csv('tmp/{}_day.csv'.format(name))["text"]
    os.system('rm {}'.format('tmp/{}_day.csv'.format(name)))
    return tweets

def analyze(word):
    print(word)
    dates, data = get_all_dates(word)
    with open('data/sentiment/{}.csv'.format(word), 'w') as f2:
            csvf2 = csv.writer(f2, delimiter=',', quoting=csv.QUOTE_NONE, escapechar=' ')
            csvf2.writerow(['day','usage'])
            for i, day in enumerate(dates):
                tweets = get_tweets_on_date(day, word)
                sentiment = TextBlob(tweets.to_string())
                score = str(sentiment.sentiment.polarity*100 + 100)[:3]
                if score[-1] == '.':
                    score=score[:2]+"0"
                csvf2.writerow([day, str(data[i]) + "." + score])

    

analyze("football")
analyze("bee")
analyze("american_football")
analyze("uk")
analyze("spain")
analyze("catalonia")
analyze("shooting_star")
analyze("factory")
analyze("pig")
analyze("panda")
analyze("snake")
analyze("santa")
analyze("fuel")
analyze("game")
analyze("beer")
analyze("chart_incr")
analyze("chart_decr")
analyze("japan")
analyze("korea")
analyze("germany")
analyze("china")
analyze("france")
analyze("itlay")
analyze("money")
analyze("rose")
analyze("broken")
analyze("angry")