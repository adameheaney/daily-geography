import json
import io;

with io.open('data/countryData.txt', mode='r', encoding='utf-8') as f:
    with open('data/countries.json', 'w') as outputFile:
        outputFile.write("{\n   \"country\":\n   [")
    for data in f.readlines():
        with open('data/countries.json', 'a') as outputFile:
            dataDict = {}
            dataList = [data.strip() for data in str(data).split(', ')]
            dataDict = {"name": dataList[0], "population": dataList[1], "capital": dataList[2], "flag":dataList[3]}
            print(dataDict["name"] + " " + dataDict["capital"])
            outputFile.write('\n\t\t' + json.dumps(dataDict, ensure_ascii=True) + ', \n')
    with open('data/countries.json', 'a') as outputFile:
        outputFile.write("\n\t] \n}")