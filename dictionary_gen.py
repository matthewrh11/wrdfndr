import csv

write_files = ["words3", "words4", "words5", "words6", "words7", "words8andup"]

words_3 = []
words_4 = []
words_5 = []
words_6 = []
words_7 = []
words_8nup = []

master_list = []

with open("dictionary.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        value = row[0]
        if len(value) == 3:
            words_3.append(value)
        if len(value) == 4:
            words_4.append(value)
        if len(value) == 5:
            words_5.append(value)
        if len(value) == 6:
            words_6.append(value)
        if len(value) == 7:
            words_7.append(value)
        if len(value) > 7:
            words_8nup.append(value)

master_list.append(words_3)
master_list.append(words_4)
master_list.append(words_5)
master_list.append(words_6)
master_list.append(words_7)
master_list.append(words_8nup)

for i in range(len(write_files)):   
    with open(write_files[i] + ".csv", 'w+') as write_file:
        write = csv.writer(write_file, dialect='excel')
        write.writerow(master_list[i])