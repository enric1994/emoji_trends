import pandas as pd
import matplotlib.pyplot as plt

print('Loading data...')
df = pd.read_csv("spain.csv") 

df["date"] = df["date"].astype("datetime64")
df["date"].groupby([df["date"].dt.month, df["date"].dt.day]).count().plot(kind="bar")
# df.groupby([df["date"].dt.year, df["date"].dt.month]).count().plot(kind="bar")
# plt.figure(figsize=(20, 10))
plt.show()

# import pdb;pdb.set_trace()

