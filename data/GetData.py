from urllib.request import urlopen

def getPopulation(country, html):
    ints = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    html = str(html).lower()
    country = country.lower()
    index = html.find(country)
    cutoff = len(country)
    while cutoff > 7 and index == -1:
        index = html.find(country[0:cutoff])
        cutoff -= 3
    if index != -1:
        while html[index] not in ints:
            index += 1
        endIndex = index
        while html[endIndex]  != '<':
            endIndex += 1
        return html[index:endIndex]


def getCountries():
    with open('data/countries.txt', 'r') as f:
        return [country.strip() for country in f.readlines()]

def getPops():
    url = 'https://www.worldometers.info/world-population/population-by-country/'
    page = urlopen(url)
    html_bytes = page.read()
    html = html_bytes.decode("utf-8")
    html = str(html)
    outputString = ''
    countries = getCountries()
    for country in countries:
        pop = getPopulation(country, html)
        if pop != None:
            outputString += country + ', ' + pop + '\n'
        else:
            print("couldn't get pop of " + country)
            outputString += country + '\n'
    with open('data/countryData.txt', 'w') as output:
        output.write(outputString)

def getCapitals():
    url = 'https://www.boldtuesday.com/pages/alphabetical-list-of-all-countries-and-capitals-shown-on-list-of-countries-poster'
    page = urlopen(url)
    html_bytes = page.read()
    html = str(html_bytes.decode("utf-8")).lower()
    # print(html)
    outputString = ''
    countries = getCountries()
    with open('data/countryData.txt', 'r') as input:
        for country in countries:
            index = html.find(country.lower())
            if index != -1:
                index = html.find('<strong>', index) + 8
                outputString += input.readline().strip() + ', ' + html[index:html.find('<',index)].capitalize() + '\n'
            else:
                outputString += input.readline().strip() + ', ' + '\n'
    return outputString

def getFlagDirs():
    outputString = ''
    countries = getCountries()
    with open('data/countryData.txt', 'r') as input:
        for country in countries:
            outputString += input.readline().strip() + ', ' + country + '.png' + '\n'
    return outputString

string = getFlagDirs()
with open('data/countryData.txt', 'w', encoding="utf-8") as f:
    f.write(string)