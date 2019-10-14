#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Conta caracteres inversa

palavra = input()
palavrai = ''
cont1 = 0

for letra in range(len(palavra)-1,-1,-1):
    palavrai += palavra[letra]

for i in range(len(palavra)): 
    if palavrai[i] == palavra[i]:
        cont1 += 1

print("A palavra {0} contém {1} caractere(s) coincidente(s) com a sua inversa.".format(palavra,cont1))
