#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Grep

#Entrada
key = input()
n = int(input())
#decomposição da chave
k = str(key[0])
e = str(key[1])
y = str(key[2])
#Entrada das repetições
for i in range (n):
    palavras = input()
    for palavra in range(2,len(palavras)):
        if palavras[palavra-2] == k and palavras[palavra-1] == e and palavras[palavra] == y:
            print(palavras)

