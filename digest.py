import csv
import datetime
import os

start_date = datetime.datetime(2010,1,1)
days_number = 3500
date_array = [start_date + datetime.timedelta(days=x) for x in range(days_number)]

def clean(folder_name):

    print('Merging all CSV files in one...')
    os.system('cat results/{}/* > postprocessing/{}_clean.csv'.format(folder_name, folder_name))
    print('Removing headers...')
    remove = '"username","date","retweets","favorites","text","geo","mentions","hashtags","id","permalink","emoji"'
    os.system("awk '!/{}/' postprocessing/{}_clean.csv > temp && mv temp postprocessing/{}_no_header.csv".format(remove, folder_name, folder_name))

    date_dict = {}

    for date in date_array:
        date_dict[date] = 0

    print('Digesting...')
    with open('postprocessing/{}_no_header.csv'.format(folder_name)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            try:
                datetime_object = datetime.datetime.strptime(row[1],'%Y-%m-%d %H:%M').replace(hour=0,minute=0)
                date_dict[datetime_object] += 1
            except:
                pass

            line_count +=1

    print("Writing CSV...")
    with open('output/{}.csv'.format(folder_name), mode='w') as f:
        writer = csv.writer(f, delimiter=',')
        writer.writerow(['day,usage'])
        for date in date_array:
            writer.writerow([date.strftime("%Y-%m-%d"), date_dict[date]])


# clean('bee')
