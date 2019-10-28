import pandas as pd
import math

print('Loading data...')
data = pd.read_csv("spainsmall.csv") 
print(data.shape)

total=0
count=0
emoji=0
for i, line in enumerate(data['emoji']):
    print(i)
    total+=1
    try:
        if math.isnan(line):
            data.drop(i)
            count+=1
    except:
        emoji+=1
print(str(count) + ' / ' + str(total) + ' -- ' + str(emoji))
print(data.shape)
data.to_csv("spain_clean.csv", index=True, encoding='utf8')
import pdb;pdb.set_trace()
