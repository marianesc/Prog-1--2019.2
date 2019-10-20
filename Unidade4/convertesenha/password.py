word = input()
password = ""
cont = 0

for letter in word:
    if letter == word[0] and len(password) == 0: password += letter
    else:   
        if letter.lower() == "a": 
            password += "4"
            cont += 1
        elif letter.lower() == "e": 
            password += "3"
            cont += 1
        elif letter.lower() == "i": 
            password += "1"
            cont += 1
        elif letter.lower() == "o": 
            password += "0"
            cont += 1
        else: password += letter

print('{} ({} troca(s))' .format(password, cont))