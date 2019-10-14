#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Palavras com Letras Dobradas

n = int(input())
palavrasemd = []
palavracomd = []

for i in range(n):
    cont1 = 0
    palavras = input()
    for palavra in range(1,(len(palavras))):
            if palavras[palavra-1] == palavras[palavra]:
                cont1 += 1
    if cont1 > 0 :
        palavracomd.append(palavras)
    else:
        palavrasemd.append(palavras)

print("{} palavra(s) com letras dobradas:".format(len(palavracomd)))
for p in range(len(palavracomd)):
    print(palavracomd[p])
print('---')
print('{} palavra(s) sem letras dobradas:'.format(len(palavrasemd)))
for p in range(len(palavrasemd)):
    print(palavrasemd[p])

