import os
import datetime
import psutil
import time

# Stop all: sudo pkill python
# Check workers: ps -fC python3 |wc -l

# Merge all CSVs in one file: cat * > football.csv 
# Remove headers: awk '!/"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"/' football.csv > temp && mv temp football_clean.csv
# 💔Add header: sed -i '1 i\"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"' football_clean.csv

# Start webserver python -m SimpleHTTPServer 8000

MAX_LOAD_AVG = 4
start_date = datetime.datetime(2010,1,1)
days_number = 3500


emojis=[
    ["football","⚽"],
    ["bee","🐝"],
    ["american_football","🏈"],
    ["uk","🇬🇧"],
    ["spain","🇪🇸"],
    ["catalonia", "🎗️"],
    ["shooting_star","🌠"],
    ["factory", "🏭"],
    ["pig", "🐖"],
    ["panda", "🐼"],
    ["snake", "🐍"],
    ["santa","🎅"],
    ["fuel", "⛽"],
    ["game","🎮"],
    ["beer","🍺"],
    ["chart_incr","📈"],
    ["chart_decr","📉"],
    ["japan","🇯🇵"],
    ["korea","🇰🇷"],
    ["germany","🇩🇪"],
    ["china","🇨🇳"],
    ["france","🇫🇷"],
    ["itlay","🇮🇹"],
    ["money","💸"],
    ["rose", "🌹"],
    ["recycle","♻️"],
    ["broken", "💔"],
    ["angry","😠"]
    
]

for emoji in emojis:

    os.makedirs('results/' + emoji[0], exist_ok=True)


    for i in range(days_number):

        next_date = start_date + datetime.timedelta(days=i+1)
        next_year = str(next_date.year).zfill(4) 
        next_month = str(next_date.month).zfill(2) 
        next_day = str(next_date.day).zfill(2) 

        current_date = start_date + datetime.timedelta(days=i)
        current_year = str(current_date.year).zfill(4) 
        current_month = str(current_date.month).zfill(2) 
        current_day = str(current_date.day).zfill(2) 


        lavg = psutil.getloadavg()[0]
        while lavg > MAX_LOAD_AVG:
            print('waiting for workers...')
            time.sleep(1)
            lavg = psutil.getloadavg()[0]
            


        

        os.system('python3 Exporter.py --lang "en" --querysearch "{}" --maxtweets 100000000 --output={}.csv --since {}-{}-{} --until {}-{}-{} &'.format(
            emoji[1],
            'results/{}/{}_{}-{}-{}'.format(emoji[0], emoji[0], current_year, current_month, current_day),
            current_year,current_month,current_day,
            next_year,next_month,next_day
        ))

        print("{} worker {} created".format(emoji[1], i))
        time.sleep(0.5)