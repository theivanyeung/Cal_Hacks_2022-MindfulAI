import requests
import random
from bs4 import BeautifulSoup

URL = 'https://www.microaggressions.com/'
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
stringList = []

net = soup.find_all("div", class_="box")
out = open('scrapes.txt', "a", encoding='utf-8')
for box in net:
    out.write(box + '\n')

out.close()