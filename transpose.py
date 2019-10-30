from csv import reader, writer 
with open('output.csv') as f, open('output2.csv', 'w') as fw: 
    writer(fw, delimiter=',').writerows(zip(*reader(f, delimiter=',')))