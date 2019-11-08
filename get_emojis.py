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
start_date = datetime.datetime(2013,1,1)
days_number = 2410


emojis=[
    ["pile_of_poo","💩"],
    ["musical_note","🎵"],
    ["pistol","🔫"],
    ["airplane","✈️"],
    ["ghost", "👻"],
    ["movie_camera","🎥"],
    ["pizza", "🍕"],
    ["snowflake", "❄️"],
    ["four_leaf_clover", "🍀"],
    ["balloon", "🎈"],
    ["trophy","🏆"],
    ["us", "🇺🇸"],
    ["wrapped_gift","🎁"],
    ["rocket","🚀"],
    ["fallen_leaf","🍂"],
    ["bomb","💣"],
    ["basketball","🏀"],
    ["books","📚"],
    ["baby","👶"],
    ["guitar","🎸"],
    ["alien_monster","👾"],
    ["candy","🍬"],
    ["graduation_cap","🎓"],
    ["cookie", "🍪"],
    ["baseball","⚾"],
    ["cigarette", "🚬"],
    ["syringe","💉"],
    ["soft_ice_cream","🍦"],
    ["envelope", "✉️"],
    ["ballot_box_with_ballot","🗳️"],
    ["top_hat", "🎩"],
    ["hourglass_done", "⌛"],
    ["calendar", "📅"],
    ["bicycle", "🚲"],
    ["ring","💍"],
    ["clapper_board", "🎬"],
    ["light_bulb","💡"],
    ["bikini","👙"],
    ["chequered_flag","🏁"],
    ["violin","🎻"],
    ["womens_room","🚺"],
    ["mens_room","🚹"],
    ["church","⛪"],
    ["kitchen_knife","🔪"],
    ["rainbow","🌈"],
    ["hong_kong","🇭🇰"],
    ["brazil","🇧🇷"],
    ["syria", "🇸🇾"],
    ["eritrea","🇪🇷"],
    ["palestinian_territories", "🇵🇸"],
    ["india","🇮🇳"],
    ["ireland","🇮🇪"],
    ["skis", "🎿"],
    ["snowboarder","🏂"],
    ["wheelchair_symbol", "♿"],
    ["toilet", "🚽"],
    ["dog", "🐶"],
    ["cat", "🐱"],
    ["lion","🦁"],
    ["horse", "🐴"],
    ["unicorn","🦄"],
    ["cow","🐮"],
    ["mouse","🐭"],
    ["rabbit","🐰"],
    ["bear","🐻"],
    ["koala","🐨"],
    ["elephant","🐘"],
    ["chicken","🐔"],
    ["bird","🐦"],
    ["penguin","🐧"],
    ["dragon","🐲"],
    ["turtle", "🐢"],
    ["crocodile","🐊"],
    ["fish", "🐟"],
    ["snail","🐌"],
    ["cactus","🌵"],
    ["tree","🌳"],
    ["scissors","✂️"],
    ["apple","🍎"],
    ["watermelon","🍉"],
    ["pear", "🍐"],
    ["lemon","🍋"],
    ["tomato", "🍅"],
    ["banana","🍌"]
    
]

for emoji in emojis:

    os.makedirs('/media/enric/enric_hdd/datasets/emoji_trends/emojis_raw/' + emoji[0], exist_ok=True)


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
            '/media/enric/enric_hdd/datasets/emoji_trends/emojis_raw/{}/{}_{}-{}-{}'.format(emoji[0], emoji[0], current_year, current_month, current_day),
            current_year,current_month,current_day,
            next_year,next_month,next_day
        ))

        print("{} worker {} created".format(emoji[1], i))
        time.sleep(0.5)