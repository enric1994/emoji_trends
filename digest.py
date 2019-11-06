import csv
import datetime
import os
from downsample import downsample
from tqdm import tqdm

start_date = datetime.datetime(2013,1,1)
days_number = 2405
downsample_factor = 50
date_array = [start_date + datetime.timedelta(days=x) for x in range(days_number)]

base_path = '/media/enric/enric_hdd/datasets/emoji_trends'

def clean(folder_name):
    print('-----------------')
    print('Digesting: {}'.format(folder_name))

    print('Merging all CSV files in one...')
    os.system('cat {}/emojis_raw/{}/* > {}/clean_emojis/{}_unified.csv'.format(base_path, folder_name, base_path, folder_name))
    print('Removing headers...')
    remove = '"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"'
    os.system("awk '!/{}/' {}/clean_emojis/{}_unified.csv > temp && mv temp {}/clean_emojis/{}_no_header.csv".format(remove, base_path, folder_name, base_path, folder_name))

    date_dict = {}

    for date in date_array:
        date_dict[date] = 0

    print('Digesting...')
    with open('{}/clean_emojis/{}_no_header.csv'.format(base_path, folder_name)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in tqdm(csv_reader):
            try:
                datetime_object = datetime.datetime.strptime(row[1],'%Y-%m-%d %H:%M').replace(hour=0,minute=0)
                date_dict[datetime_object] += 1
            except:
                pass

            line_count +=1
    print('Deleting intermediate files...')
    os.system('rm {}/clean_emojis/{}_unified.csv'.format(base_path, folder_name))
    print("Writing CSV...")
    with open('{}/emojis_3600/{}.csv'.format(base_path, folder_name), mode='w') as f:
        writer = csv.writer(f, delimiter=',')
        writer.writerow(['day,usage'])
        for date in date_array:
            writer.writerow([date.strftime("%Y-%m-%d"), date_dict[date]])
    
    downsample('{}/emojis_3600/{}.csv'.format(base_path, folder_name), '{}/emojis_50/{}.csv'.format(base_path, folder_name), downsample_factor)

clean("football")
clean("bee")
clean("american_football")
clean("spain")
clean("catalonia")
clean("shooting_star")
clean("factory")
clean("pig")
clean("panda")
clean("snake")
clean("santa")
clean("fuel")
clean("game")
clean("beer")
clean("chart_incr")
clean("chart_decr")
clean("japan")
clean("korea")
clean("germany")
clean("china")
clean("france")
clean("itlay")
clean("money")
clean("rose")
clean("recycle")
clean("broken")
clean("angry")