from lttb.lttb import largest_triangle_three_buckets
import csv


def downsample(source_path, output_path, factor):
    with open(source_path, 'r') as f:
        data = []
        dates = []
        csvf = csv.reader(f, delimiter=',')
        next(f)
        count = 0
        for row in csvf:
            dates.append(row[0])
            data.append([count, int(row[1])])
            count+=1
        sampled = largest_triangle_three_buckets(data, factor)
        with open(output_path, 'w') as f2:
            csvf2 = csv.writer(f2, delimiter=',', quoting=csv.QUOTE_NONE, escapechar=' ')
            csvf2.writerow(['day','usage'])
            for i, row in enumerate(sampled):
                csvf2.writerow([dates[sampled[i][0]], row[1]])


# downsample('output/football.csv', 'output/football2.csv', 50)