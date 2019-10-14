#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Caixa Preta

n = int(input())
cont = 0
neg = 0
inv = 0
for i in range(n):
    peso,combustivel,altitude = input().split()
    peso = int(peso)
    combustivel = int(combustivel)
    altitude = int(altitude)
    if peso >= 0 and neg == 0 :
        cont += 1
    else:
        neg = 1
    if combustivel >= 0 and neg == 0:
        cont += 1
    else:
        neg=1
    if altitude >= 0 and neg == 0:
        cont += 1
    else:
        neg=1
    if inv==0:
        if peso < 0:
            print("dado inconsistente. peso negativo.")
            inv=1
        elif combustivel < 0:
            print("dado inconsistente. combustível negativo.")
            inv=1
        elif altitude < 0:
            print("dado inconsistente. altitude negativa.")
            inv=1
print("{} dados válidos.".format(cont))
