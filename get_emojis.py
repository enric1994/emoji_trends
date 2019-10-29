import os
import datetime
import psutil
import time

emojis=[
    ["football","⚽"]
]

os.makedirs('results/'+emojis[0][0], exist_ok=True)


start_date = datetime.datetime(2018,1,1)
for i in range(365):

    next_date = start_date + datetime.timedelta(days=i+1)
    next_year = str(next_date.year).zfill(4) 
    next_month = str(next_date.month).zfill(2) 
    next_day = str(next_date.day).zfill(2) 

    current_date = start_date + datetime.timedelta(days=i)
    current_year = str(current_date.year).zfill(4) 
    current_month = str(current_date.month).zfill(2) 
    current_day = str(current_date.day).zfill(2) 


    lavg = psutil.getloadavg()[0]
    while lavg >10:
        time.sleep(60)
        print('waiting for workers...')



    os.system('python3 Exporter.py --lang "en" --querysearch "{}" --maxtweets 100000000 --output={}.csv --since {}-{}-{} --until {}-{}-{} &'.format(
        emojis[0][1],
        'results/{}/{}_{}-{}-{}'.format(emojis[0][0], emojis[0][0], current_year, current_month, current_day),
        current_year,current_month,current_day,
        next_year,next_month,next_day
    ))

    time.sleep(2)