import csv
import datetime

start_date = datetime.datetime(2010,1,1)
days_number = 3500
date_array = [start_date + datetime.timedelta(days=x) for x in range(days_number)]
date_dict = {}

for date in date_array:
    date_dict[date] = 0

with open('results/preprocessed/football_clean.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        try:
            datetime_object = datetime.datetime.strptime(row[1],'%Y-%m-%d %H:%M').replace(hour=0,minute=0)
            # import pdb;pdb.set_trace()
            date_dict[datetime_object] += 1
        except:
            pass

        line_count +=1
        print(line_count)

print("Writing CSV...")
with open('output.csv', mode='w') as f:
    writer = csv.writer(f, delimiter=',')
    for date in date_array:
        # import pdb;pdb.set_trace()
        writer.writerow([date.strftime("%Y-%m-%d"), date_dict[date]])



