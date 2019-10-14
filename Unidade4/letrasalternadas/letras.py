#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Letras alternadas

palavra = input()
palavra_aux = ''
for letras in range(0,len(palavra),2):
    palavra_aux += palavra[letras]
print(palavra_aux)

