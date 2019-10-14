#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Soma os Múltiplos do Primeiro Elemento de uma Lista

nr = int(input())
numeros = 0

for i in range(10):
    n = int(input())
    if n % nr == 0:
        numeros += n

print(numeros)


